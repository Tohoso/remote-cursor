# MANUS-REQUEST: TASK-018 アクティビティログ画面の実装

**Requested By**: Manus  
**Timestamp**: 2025-01-01  
**Priority**: Medium  
**Track**: mobile-app

---

## 指示

TASK-018（アクティビティログ画面の実装）を実装してください。

プロジェクト全体のリアルタイムなイベントストリームを表示する `ActivityLogScreen` を実装します。

## 前提条件

- ✅ TASK-015: ナビゲーションのセットアップ - 完了必須

## 参照ドキュメント

1. **タスク仕様書**: `tasks/TASK-018-EPIC-09-ACTIVITY-LOG.md`
2. **コンポーネント設計書**: `docs/design/COMPONENT_DESIGN.md`
3. **状態管理設計書**: `docs/design/STATE_MANAGEMENT.md`

## 実装手順

### 1. ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile-app/task-018-activity-log
```

### 2. FilterChipsコンポーネントの作成

`src/mobile/components/activity/FilterChips.tsx`:

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography } from '../../theme';

export type FilterOption = 'all' | 'system' | 'websocket' | 'claude-1' | 'claude-2';

interface FilterChipsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const filters: { key: FilterOption; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'system', label: 'システム' },
  { key: 'websocket', label: 'WebSocket' },
  { key: 'claude-1', label: 'Claude-1' },
  { key: 'claude-2', label: 'Claude-2' },
];

export const FilterChips: React.FC<FilterChipsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 16 }}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          onPress={() => onFilterChange(filter.key)}
          style={{
            backgroundColor: activeFilter === filter.key ? colors.accent : colors.surface,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: activeFilter === filter.key ? colors.accent : colors.border,
          }}
        >
          <Text style={{
            ...typography.body,
            color: activeFilter === filter.key ? colors.background : colors.primaryText,
            fontWeight: activeFilter === filter.key ? '600' : '400',
          }}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
```

### 3. LogEntryコンポーネントの作成/拡張

`src/mobile/components/activity/LogEntry.tsx`:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { ActivityLogEntry } from '@common/types';
import { colors, typography } from '../../theme';

interface LogEntryProps {
  log: ActivityLogEntry;
}

export const LogEntry: React.FC<LogEntryProps> = ({ log }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return colors.status.blocked;
      case 'warning': return colors.status.inProgress;
      case 'info': return colors.accent;
      default: return colors.secondaryText;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'claude-1': return '🤖';
      case 'claude-2': return '🤖';
      case 'websocket': return '🔌';
      case 'system': return '⚙️';
      default: return '📋';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 16,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: getLevelColor(log.level),
    }}>
      {/* ヘッダー行 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Text style={{ fontSize: 14, marginRight: 4 }}>{getLevelIcon(log.level)}</Text>
        <Text style={{ fontSize: 14, marginRight: 8 }}>{getSourceIcon(log.source)}</Text>
        <Text style={{ ...typography.mono, color: colors.secondaryText, fontSize: 11 }}>
          {formatTimestamp(log.timestamp)}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={{ ...typography.caption, color: colors.secondaryText }}>
          {log.source}
        </Text>
      </View>

      {/* メッセージ */}
      <Text style={{ ...typography.body, color: colors.primaryText }}>
        {log.message}
      </Text>
    </View>
  );
};
```

### 4. ActivityLogScreenの実装

`src/mobile/screens/ActivityLogScreen.tsx` を更新：

```typescript
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDashboardStore } from '../stores/dashboardStore';
import { FilterChips, FilterOption } from '../components/activity/FilterChips';
import { LogEntry } from '../components/activity/LogEntry';
import { ActivityLogEntry } from '@common/types';
import { colors, typography } from '../theme';

export const ActivityLogScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const logs = useDashboardStore((state) => state.logs);

  const filteredLogs = activeFilter === 'all'
    ? logs
    : logs.filter(log => log.source === activeFilter);

  const renderItem = useCallback(({ item }: { item: ActivityLogEntry }) => (
    <LogEntry log={item} />
  ), []);

  const keyExtractor = useCallback((item: ActivityLogEntry) => item.id, []);

  const ListEmptyComponent = useCallback(() => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>📋</Text>
      <Text style={{ ...typography.h2 }}>ログなし</Text>
      <Text style={{ ...typography.body, color: colors.secondaryText, marginTop: 8 }}>
        アクティビティログはまだありません
      </Text>
    </View>
  ), []);

  const ListHeaderComponent = useCallback(() => (
    <View style={{ paddingTop: 16 }}>
      <Text style={{ ...typography.h1, paddingHorizontal: 16, marginBottom: 16 }}>
        アクティビティログ
      </Text>
      <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <Text style={{ ...typography.caption, color: colors.secondaryText, paddingHorizontal: 16, marginBottom: 8 }}>
        {filteredLogs.length}件のログ
      </Text>
    </View>
  ), [activeFilter, filteredLogs.length]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={filteredLogs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        // パフォーマンス最適化
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={15}
      />
    </View>
  );
};
```

### 5. コンポーネントのエクスポート

`src/mobile/components/activity/index.ts`:

```typescript
export { FilterChips, FilterOption } from './FilterChips';
export { LogEntry } from './LogEntry';
```

### 6. ボトムタブにActivityLogを追加（オプション）

既存のボトムタブナビゲーションにActivityLogタブを追加する場合：

```typescript
// BottomTabNavigator内
<Tab.Screen
  name="ActivityLog"
  component={ActivityLogScreen}
  options={{
    tabBarLabel: 'ログ',
    tabBarIcon: ({ color, size }) => (
      <Text style={{ fontSize: size, color }}>📋</Text>
    ),
  }}
/>
```

### 7. progress.md の更新

タスク完了後、`progress.md` を以下のように更新：

```markdown
| TASK-018 | mobile-app | アクティビティログ画面の実装 | ✅ Done | TASK-015 |
```

### 8. PR 作成

```bash
git add .
git commit -m "feat: Implement activity log screen (TASK-018)"
git push origin feature/mobile-app/task-018-activity-log
gh pr create --base main --title "feat: Activity log screen implementation (TASK-018)" --body "..."
```

## 完了条件チェックリスト

- [ ] `FilterChips`コンポーネントが作成されている
- [ ] `LogEntry`コンポーネントが作成されている
- [ ] `ActivityLogScreen`がZustandストアからログを取得している
- [ ] フィルターチップでログをフィルタリングできる
- [ ] ログレベルに応じた色とアイコンが表示される
- [ ] ソースに応じたアイコンが表示される
- [ ] FlatListでパフォーマンス最適化されている
- [ ] ログがない場合の表示がある
- [ ] 新しいログがリアルタイムで表示される
- [ ] TypeScriptコンパイルエラーがない
- [ ] progress.mdが更新されている
- [ ] PRが作成されている

---

🤖 Generated by Manus
