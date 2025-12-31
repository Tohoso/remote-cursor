# MANUS-REQUEST: TASK-020 プッシュ通知の実装

**Requested By**: Manus  
**Timestamp**: 2025-01-01  
**Priority**: Medium  
**Track**: mobile-app (CC1) + server (CC2)

---

## 指示

TASK-020（プッシュ通知の実装）を実装してください。

Expo Push Notificationsを導入し、重要なイベント（特にブロッカー発生時）をユーザーに通知する機能を実装します。

## 前提条件

- ✅ Sprint 2 Phase 1-4 完了

## 参照ドキュメント

1. **タスク仕様書**: `tasks/TASK-016-EPIC-07-TRACK-DETAIL.md` (TASK-020セクション)
2. **Expo Push Notifications**: https://docs.expo.dev/push-notifications/overview/

---

## 実装手順

### Part 1: クライアントサイド (CC1 - mobile-app)

#### 1.1 ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile-app/task-020-push-notifications
```

#### 1.2 依存関係のインストール

```bash
cd src/mobile
npx expo install expo-notifications expo-device expo-constants
```

#### 1.3 通知フックの作成

`src/mobile/hooks/usePushNotifications.ts`:

```typescript
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 通知の表示設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface PushNotificationState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: string | null;
}

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? null))
      .catch(err => setError(err.message));

    // 通知受信リスナー
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // 通知タップリスナー
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      // ブロッカー通知の場合、BlockerDetailScreenに遷移
      if (data?.type === 'blocker_alert' && data?.blockerId) {
        // ナビゲーション処理（App.tsxで設定）
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return { expoPushToken, notification, error };
};

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      throw new Error('プッシュ通知の許可が必要です');
    }
    
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } else {
    throw new Error('実機でのみプッシュ通知が利用可能です');
  }

  return token;
}
```

#### 1.4 App.tsxでの統合

`src/mobile/App.tsx` を更新：

```typescript
import { usePushNotifications } from './hooks/usePushNotifications';
import { useWebSocket } from './hooks/useWebSocket';

export default function App() {
  const { expoPushToken, error: pushError } = usePushNotifications();
  const { socket } = useWebSocket();

  // トークンをサーバーに送信
  useEffect(() => {
    if (socket && expoPushToken) {
      socket.emit('register_push_token', { token: expoPushToken });
    }
  }, [socket, expoPushToken]);

  // ... 既存のコード
}
```

#### 1.5 PR作成 (CC1)

```bash
git add .
git commit -m "feat: Add push notification support (TASK-020 client)"
git push origin feature/mobile-app/task-020-push-notifications
gh pr create --base main --title "feat: Push notification client setup (TASK-020)" --body "..."
```

---

### Part 2: サーバーサイド (CC2 - server)

#### 2.1 ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/server/task-020-push-notifications
```

#### 2.2 依存関係のインストール

```bash
cd src/server
npm install expo-server-sdk
```

#### 2.3 プッシュ通知サービスの作成

`src/server/services/pushNotificationService.ts`:

```typescript
import Expo, { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

const expo = new Expo();

// 登録されたプッシュトークンを保存（本番ではDBに保存）
const pushTokens: Set<string> = new Set();

export const pushNotificationService = {
  /**
   * プッシュトークンを登録
   */
  registerToken(token: string): void {
    if (Expo.isExpoPushToken(token)) {
      pushTokens.add(token);
      console.log(`[Push] Token registered: ${token.substring(0, 20)}...`);
    } else {
      console.warn(`[Push] Invalid token: ${token}`);
    }
  },

  /**
   * プッシュトークンを削除
   */
  unregisterToken(token: string): void {
    pushTokens.delete(token);
  },

  /**
   * ブロッカーアラート通知を送信
   */
  async sendBlockerAlert(blocker: {
    id: string;
    reason: string;
    trackName: string;
  }): Promise<void> {
    if (pushTokens.size === 0) {
      console.log('[Push] No registered tokens, skipping notification');
      return;
    }

    const messages: ExpoPushMessage[] = [];

    for (const token of pushTokens) {
      messages.push({
        to: token,
        sound: 'default',
        title: '⚠️ ブロッカー検出',
        body: `${blocker.trackName}: ${blocker.reason}`,
        data: {
          type: 'blocker_alert',
          blockerId: blocker.id,
        },
        priority: 'high',
      });
    }

    try {
      const chunks = expo.chunkPushNotifications(messages);
      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }

      console.log(`[Push] Sent ${tickets.length} notifications for blocker: ${blocker.id}`);
    } catch (error) {
      console.error('[Push] Error sending notifications:', error);
    }
  },

  /**
   * 一般的な通知を送信
   */
  async sendNotification(title: string, body: string, data?: object): Promise<void> {
    if (pushTokens.size === 0) return;

    const messages: ExpoPushMessage[] = Array.from(pushTokens).map(token => ({
      to: token,
      sound: 'default',
      title,
      body,
      data,
    }));

    try {
      const chunks = expo.chunkPushNotifications(messages);
      for (const chunk of chunks) {
        await expo.sendPushNotificationsAsync(chunk);
      }
    } catch (error) {
      console.error('[Push] Error:', error);
    }
  },
};
```

#### 2.4 WebSocketハンドラの更新

`src/server/websocket/handlers.ts` を更新：

```typescript
import { pushNotificationService } from '../services/pushNotificationService';

// register_push_tokenイベントハンドラを追加
socket.on('register_push_token', (data: { token: string }) => {
  pushNotificationService.registerToken(data.token);
});

// blocker_alertイベント送信時にプッシュ通知も送信
// progressParser.ts または該当箇所で:
if (diff.newBlockers && diff.newBlockers.length > 0) {
  for (const blocker of diff.newBlockers) {
    // WebSocket送信
    io.emit('blocker_alert', { blocker });
    
    // プッシュ通知送信
    pushNotificationService.sendBlockerAlert({
      id: blocker.id,
      reason: blocker.reason,
      trackName: blocker.trackName || 'Unknown',
    });
  }
}
```

#### 2.5 PR作成 (CC2)

```bash
git add .
git commit -m "feat: Add push notification server support (TASK-020 server)"
git push origin feature/server/task-020-push-notifications
gh pr create --base main --title "feat: Push notification server setup (TASK-020)" --body "..."
```

---

## progress.md の更新

タスク完了後、`progress.md` を以下のように更新：

```markdown
| TASK-020 | mobile-app + server | プッシュ通知の実装 | ✅ Done | - |
```

## 完了条件チェックリスト

### クライアント (CC1)
- [ ] `expo-notifications`がインストールされている
- [ ] `usePushNotifications`フックが作成されている
- [ ] 通知許可リクエストが実装されている
- [ ] プッシュトークンがサーバーに送信される
- [ ] 通知タップ時のナビゲーションが実装されている

### サーバー (CC2)
- [ ] `expo-server-sdk`がインストールされている
- [ ] `pushNotificationService`が作成されている
- [ ] `register_push_token`イベントハンドラが実装されている
- [ ] ブロッカー検出時にプッシュ通知が送信される

---

🤖 Generated by Manus
