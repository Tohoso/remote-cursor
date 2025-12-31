# MANUS-REQUEST: TASK-015 ナビゲーションのセットアップ

**Requested By**: Manus  
**Timestamp**: 2025-01-01  
**Priority**: High  
**Track**: mobile-app

---

## 指示

TASK-015（ナビゲーションのセットアップ）を実装してください。

React Navigationを使用して、新規画面（TrackDetail, BlockerDetail, ActivityLog）へのナビゲーションを実装します。

## 前提条件

- ✅ TASK-014: 新規ダッシュボードコンポーネントの実装 - 完了

## 参照ドキュメント

1. **タスク仕様書**: `tasks/TASK-015-EPIC-06-NAVIGATION.md`
2. **実装計画書**: `docs/implementation/IMPLEMENTATION_PLAN.md`

## 実装手順

### 1. ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile-app/task-015-navigation
```

### 2. 型定義ファイルの作成

`src/mobile/navigation/types.ts` を作成：

```typescript
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined;
  TrackDetail: { trackId: string };
  BlockerDetail: { blockerId?: string };
  ActivityLog: undefined;
};

// Screen props types
export type TrackDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TrackDetail'>;
export type BlockerDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'BlockerDetail'>;
export type ActivityLogScreenProps = NativeStackScreenProps<RootStackParamList, 'ActivityLog'>;

// Navigation hook type
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

### 3. プレースホルダー画面の作成

各画面のプレースホルダーを作成：

**`src/mobile/screens/TrackDetailScreen.tsx`**:
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { TrackDetailScreenProps } from '../navigation/types';
import { colors, typography } from '../theme';

export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ route }) => {
  const { trackId } = route.params;
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...typography.h1 }}>トラック詳細</Text>
      <Text style={{ ...typography.body, color: colors.secondaryText }}>Track ID: {trackId}</Text>
      <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 16 }}>
        TASK-016で実装予定
      </Text>
    </View>
  );
};
```

**`src/mobile/screens/BlockerDetailScreen.tsx`**:
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { BlockerDetailScreenProps } from '../navigation/types';
import { colors, typography } from '../theme';

export const BlockerDetailScreen: React.FC<BlockerDetailScreenProps> = ({ route }) => {
  const blockerId = route.params?.blockerId;
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...typography.h1 }}>ブロッカー詳細</Text>
      {blockerId && (
        <Text style={{ ...typography.body, color: colors.secondaryText }}>Blocker ID: {blockerId}</Text>
      )}
      <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 16 }}>
        TASK-017で実装予定
      </Text>
    </View>
  );
};
```

**`src/mobile/screens/ActivityLogScreen.tsx`**:
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { colors, typography } from '../theme';

export const ActivityLogScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...typography.h1 }}>アクティビティログ</Text>
      <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 16 }}>
        TASK-018で実装予定
      </Text>
    </View>
  );
};
```

### 4. ナビゲーターの更新

`App.tsx` または `navigation/index.tsx` を更新して、StackNavigatorを追加：

```typescript
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import { TrackDetailScreen } from './screens/TrackDetailScreen';
import { BlockerDetailScreen } from './screens/BlockerDetailScreen';
import { ActivityLogScreen } from './screens/ActivityLogScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// StackNavigator構造:
// Stack.Navigator
//   ├─ MainTabs (既存のBottomTabNavigator)
//   ├─ TrackDetail
//   ├─ BlockerDetail
//   └─ ActivityLog
```

### 5. TrackCardとBlockerAlertのナビゲーション実装

**`TrackCard.tsx`** を更新：
```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// コンポーネント内
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

const handlePress = () => {
  navigation.navigate('TrackDetail', { trackId: track.id });
};
```

**`BlockerAlert.tsx`** を更新：
```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// コンポーネント内
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

const handlePress = () => {
  navigation.navigate('BlockerDetail', {});
};
```

### 6. 依存関係のインストール

必要に応じて追加パッケージをインストール：

```bash
cd src/mobile
npm install @react-navigation/native-stack
```

### 7. progress.md の更新

タスク完了後、`progress.md` を以下のように更新：

```markdown
| TASK-015 | mobile-app | ナビゲーションのセットアップ | ✅ Done | TASK-014 |
```

また、"Completed Task Details" セクションに完了エントリを追加。

### 8. PR 作成

```bash
git add .
git commit -m "feat: Setup navigation with stack navigator (TASK-015)"
git push origin feature/mobile-app/task-015-navigation
gh pr create --base main --title "feat: Navigation setup with stack navigator (TASK-015)" --body "..."
```

## 完了条件チェックリスト

- [ ] `navigation/types.ts`が作成され、型定義が完了している
- [ ] `TrackDetailScreen`プレースホルダーが作成されている
- [ ] `BlockerDetailScreen`プレースホルダーが作成されている
- [ ] `ActivityLogScreen`プレースホルダーが作成されている
- [ ] StackNavigatorが設定されている
- [ ] `TrackCard`タップでTrackDetailScreenに遷移する
- [ ] `BlockerAlert`タップでBlockerDetailScreenに遷移する
- [ ] ボトムタブナビゲーションが引き続き動作する
- [ ] TypeScriptコンパイルエラーがない
- [ ] progress.mdが更新されている
- [ ] PRが作成されている

---

🤖 Generated by Manus
