# MANUS-REQUEST: TASK-017 ブロッカー詳細画面の実装

**Requested By**: Manus  
**Timestamp**: 2025-01-01  
**Priority**: High  
**Track**: mobile-app

---

## 指示

TASK-017（ブロッカー詳細画面の実装）を実装してください。

アクティブなブロッカーの詳細情報を表示し、ユーザーが解決のための指示を送信できる `BlockerDetailScreen` を実装します。

## 前提条件

- ✅ TASK-015: ナビゲーションのセットアップ - 完了必須

## 参照ドキュメント

1. **タスク仕様書**: `tasks/TASK-017-EPIC-08-BLOCKER-DETAIL.md`
2. **コンポーネント設計書**: `docs/design/COMPONENT_DESIGN.md`
3. **API仕様書**: `docs/design/API_SPECIFICATION.md`

## 実装手順

### 1. ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile-app/task-017-blocker-detail
```

### 2. BlockerCardコンポーネントの作成

`src/mobile/components/blocker/BlockerCard.tsx`:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { Blocker } from '@common/types';
import { colors, typography } from '../../theme';

interface BlockerCardProps {
  blocker: Blocker;
}

export const BlockerCard: React.FC<BlockerCardProps> = ({ blocker }) => {
  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderLeftWidth: 4,
      borderLeftColor: colors.status.blocked,
    }}>
      {/* ヘッダー */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 24, marginRight: 8 }}>⚠️</Text>
        <Text style={{ ...typography.h2, flex: 1 }}>{blocker.title}</Text>
      </View>

      {/* 理由 */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ ...typography.label, color: colors.secondaryText, marginBottom: 4 }}>
          理由
        </Text>
        <Text style={{ ...typography.body, color: colors.primaryText }}>
          {blocker.reason}
        </Text>
      </View>

      {/* 影響を受けるタスク */}
      {blocker.impactedTasks && blocker.impactedTasks.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...typography.label, color: colors.secondaryText, marginBottom: 4 }}>
            影響を受けるタスク
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {blocker.impactedTasks.map((taskId) => (
              <View key={taskId} style={{
                backgroundColor: colors.background,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}>
                <Text style={{ ...typography.mono, color: colors.accent, fontSize: 12 }}>
                  {taskId}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 検出日時 */}
      <Text style={{ ...typography.caption, color: colors.secondaryText }}>
        検出: {new Date(blocker.detectedAt).toLocaleString('ja-JP')}
      </Text>
    </View>
  );
};
```

### 3. ResolveBlockerFormコンポーネントの作成

`src/mobile/components/blocker/ResolveBlockerForm.tsx`:

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, typography } from '../../theme';

interface ResolveBlockerFormProps {
  blockerId: string;
  onSend: (instruction: string, blockerId: string) => void;
}

export const ResolveBlockerForm: React.FC<ResolveBlockerFormProps> = ({ blockerId, onSend }) => {
  const [instruction, setInstruction] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!instruction.trim()) {
      Alert.alert('エラー', '指示を入力してください');
      return;
    }

    setIsSending(true);
    try {
      onSend(instruction.trim(), blockerId);
      setInstruction('');
      Alert.alert('成功', '指示を送信しました');
    } catch (error) {
      Alert.alert('エラー', '送信に失敗しました');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
    }}>
      <Text style={{ ...typography.h3, marginBottom: 12 }}>
        解決指示を送信
      </Text>

      <TextInput
        style={{
          backgroundColor: colors.background,
          borderRadius: 8,
          padding: 12,
          color: colors.primaryText,
          minHeight: 100,
          textAlignVertical: 'top',
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        placeholder="Claude Codeへの指示を入力..."
        placeholderTextColor={colors.secondaryText}
        value={instruction}
        onChangeText={setInstruction}
        multiline
        editable={!isSending}
      />

      <TouchableOpacity
        style={{
          backgroundColor: isSending ? colors.border : colors.accent,
          borderRadius: 8,
          padding: 14,
          alignItems: 'center',
        }}
        onPress={handleSend}
        disabled={isSending}
      >
        <Text style={{ ...typography.body, color: colors.background, fontWeight: '600' }}>
          {isSending ? '送信中...' : '指示を送信'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 4. BlockerDetailScreenの実装

`src/mobile/screens/BlockerDetailScreen.tsx` を更新：

```typescript
import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { BlockerDetailScreenProps } from '../navigation/types';
import { useDashboardStore } from '../stores/dashboardStore';
import { useWebSocket } from '../hooks/useWebSocket';
import { BlockerCard } from '../components/blocker/BlockerCard';
import { ResolveBlockerForm } from '../components/blocker/ResolveBlockerForm';
import { colors, typography } from '../theme';

export const BlockerDetailScreen: React.FC<BlockerDetailScreenProps> = ({ route }) => {
  const blockerId = route.params?.blockerId;
  const projectStatus = useDashboardStore((state) => state.projectStatus);
  const { socket } = useWebSocket();
  
  const blockers = projectStatus?.blockers ?? [];
  
  // 特定のブロッカーまたは全ブロッカーを表示
  const displayBlockers = blockerId 
    ? blockers.filter(b => b.id === blockerId)
    : blockers;

  const handleSendInstruction = (instruction: string, targetBlockerId: string) => {
    if (socket) {
      socket.emit('instruction', {
        instruction,
        context: {
          blockerId: targetBlockerId,
          type: 'blocker_resolution',
        },
      });
    }
  };

  if (displayBlockers.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>✅</Text>
        <Text style={{ ...typography.h2 }}>ブロッカーなし</Text>
        <Text style={{ ...typography.body, color: colors.secondaryText, marginTop: 8 }}>
          現在アクティブなブロッカーはありません
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ ...typography.h1, marginBottom: 16 }}>
          ブロッカー ({displayBlockers.length}件)
        </Text>

        {displayBlockers.map((blocker) => (
          <View key={blocker.id}>
            <BlockerCard blocker={blocker} />
            <ResolveBlockerForm
              blockerId={blocker.id}
              onSend={handleSendInstruction}
            />
            <View style={{ height: 24 }} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
```

### 5. コンポーネントのエクスポート

`src/mobile/components/blocker/index.ts`:

```typescript
export { BlockerCard } from './BlockerCard';
export { ResolveBlockerForm } from './ResolveBlockerForm';
```

### 6. progress.md の更新

タスク完了後、`progress.md` を以下のように更新：

```markdown
| TASK-017 | mobile-app | ブロッカー詳細画面の実装 | ✅ Done | TASK-015 |
```

### 7. PR 作成

```bash
git add .
git commit -m "feat: Implement blocker detail screen (TASK-017)"
git push origin feature/mobile-app/task-017-blocker-detail
gh pr create --base main --title "feat: Blocker detail screen implementation (TASK-017)" --body "..."
```

## 完了条件チェックリスト

- [ ] `BlockerCard`コンポーネントが作成されている
- [ ] `ResolveBlockerForm`コンポーネントが作成されている
- [ ] `BlockerDetailScreen`がZustandストアからブロッカー情報を取得している
- [ ] ブロッカーの詳細（理由、影響タスク、検出日時）が表示される
- [ ] 指示入力フォームが機能する
- [ ] 送信ボタンでWebSocketイベントが発行される
- [ ] ブロッカーがない場合の表示がある
- [ ] TypeScriptコンパイルエラーがない
- [ ] progress.mdが更新されている
- [ ] PRが作成されている

---

🤖 Generated by Manus
