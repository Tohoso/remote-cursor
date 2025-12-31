# MANUS-REQUEST: TASK-016 トラック詳細画面の実装

**Requested By**: Manus  
**Timestamp**: 2025-01-01  
**Priority**: High  
**Track**: mobile-app

---

## 指示

TASK-016（トラック詳細画面の実装）を実装してください。

特定の開発トラックに属するタスクの詳細な進捗状況とタイムラインを表示する `TrackDetailScreen` を実装します。

## 前提条件

- ✅ TASK-015: ナビゲーションのセットアップ - 完了必須

## 参照ドキュメント

1. **タスク仕様書**: `tasks/TASK-016-EPIC-07-TRACK-DETAIL.md`
2. **コンポーネント設計書**: `docs/design/COMPONENT_DESIGN.md`
3. **ワイヤーフレーム仕様書**: `docs/implementation/WIREFRAME_SPEC.md`

## 実装手順

### 1. ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile-app/task-016-track-detail
```

### 2. TrackInfoCardコンポーネントの作成

`src/mobile/components/track/TrackInfoCard.tsx`:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { Track } from '@common/types';
import { colors, typography } from '../../theme';

interface TrackInfoCardProps {
  track: Track;
}

export const TrackInfoCard: React.FC<TrackInfoCardProps> = ({ track }) => {
  const statusColors = {
    active: colors.status.success,
    paused: colors.status.inProgress,
    completed: colors.status.success,
  };

  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    }}>
      {/* トラック名とステータス */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ ...typography.h1 }}>{track.name}</Text>
        <View style={{
          backgroundColor: statusColors[track.status],
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Text style={{ ...typography.caption, color: colors.background, fontWeight: '600' }}>
            {track.status === 'active' ? 'アクティブ' : track.status === 'paused' ? '一時停止' : '完了'}
          </Text>
        </View>
      </View>

      {/* 担当エージェント */}
      <Text style={{ ...typography.label, color: colors.secondaryText, marginBottom: 12 }}>
        担当: {track.agent}
      </Text>

      {/* 進捗バー */}
      <View style={{ marginBottom: 8 }}>
        <View style={{
          height: 12,
          backgroundColor: colors.border,
          borderRadius: 6,
          overflow: 'hidden',
        }}>
          <View style={{
            width: `${track.progress}%`,
            height: '100%',
            backgroundColor: colors.accent,
          }} />
        </View>
      </View>

      {/* 進捗テキスト */}
      <Text style={{ ...typography.body, color: colors.primaryText, textAlign: 'center' }}>
        {track.completedTasks} / {track.totalTasks} タスク完了 ({track.progress}%)
      </Text>
    </View>
  );
};
```

### 3. TaskTimelineItemコンポーネントの作成

`src/mobile/components/track/TaskTimelineItem.tsx`:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { Task, TaskStatus } from '@common/types';
import { colors, typography } from '../../theme';

interface TaskTimelineItemProps {
  task: Task;
  isLast: boolean;
}

export const TaskTimelineItem: React.FC<TaskTimelineItemProps> = ({ task, isLast }) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'done': return '✅';
      case 'in_progress': return '🟡';
      case 'blocked': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'done': return colors.status.success;
      case 'in_progress': return colors.status.inProgress;
      case 'blocked': return colors.status.blocked;
      default: return colors.border;
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {/* タイムラインライン */}
      <View style={{ width: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{getStatusIcon(task.status)}</Text>
        {!isLast && (
          <View style={{
            width: 2,
            flex: 1,
            backgroundColor: getStatusColor(task.status),
            marginVertical: 4,
          }} />
        )}
      </View>

      {/* タスク情報 */}
      <View style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        marginLeft: 8,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ ...typography.mono, color: colors.accent, fontSize: 12, marginRight: 8 }}>
            {task.id}
          </Text>
        </View>
        <Text style={{ ...typography.body, color: colors.primaryText, marginBottom: 4 }}>
          {task.title}
        </Text>
        {task.dependencies && task.dependencies.length > 0 && (
          <Text style={{ ...typography.caption, color: colors.secondaryText }}>
            依存: {task.dependencies.join(', ')}
          </Text>
        )}
      </View>
    </View>
  );
};
```

### 4. TaskTimelineコンポーネントの作成

`src/mobile/components/track/TaskTimeline.tsx`:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { Task } from '@common/types';
import { TaskTimelineItem } from './TaskTimelineItem';
import { colors, typography } from '../../theme';

interface TaskTimelineProps {
  tasks: Task[];
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ ...typography.body, color: colors.secondaryText }}>
          タスクがありません
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ ...typography.h2, marginBottom: 16 }}>タスクタイムライン</Text>
      {tasks.map((task, index) => (
        <TaskTimelineItem
          key={task.id}
          task={task}
          isLast={index === tasks.length - 1}
        />
      ))}
    </View>
  );
};
```

### 5. TrackDetailScreenの実装

`src/mobile/screens/TrackDetailScreen.tsx` を更新：

```typescript
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TrackDetailScreenProps } from '../navigation/types';
import { useDashboardStore } from '../stores/dashboardStore';
import { TrackInfoCard } from '../components/track/TrackInfoCard';
import { TaskTimeline } from '../components/track/TaskTimeline';
import { colors, typography } from '../theme';

export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ route }) => {
  const { trackId } = route.params;
  const projectStatus = useDashboardStore((state) => state.projectStatus);
  
  const track = projectStatus?.tracks.find(t => t.id === trackId);

  if (!track) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...typography.body, color: colors.secondaryText }}>
          トラックが見つかりません
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <TrackInfoCard track={track} />
        <TaskTimeline tasks={track.tasks} />
      </View>
    </ScrollView>
  );
};
```

### 6. コンポーネントのエクスポート

`src/mobile/components/track/index.ts`:

```typescript
export { TrackInfoCard } from './TrackInfoCard';
export { TaskTimeline } from './TaskTimeline';
export { TaskTimelineItem } from './TaskTimelineItem';
```

### 7. progress.md の更新

タスク完了後、`progress.md` を以下のように更新：

```markdown
| TASK-016 | mobile-app | トラック詳細画面の実装 | ✅ Done | TASK-015 |
```

### 8. PR 作成

```bash
git add .
git commit -m "feat: Implement track detail screen (TASK-016)"
git push origin feature/mobile-app/task-016-track-detail
gh pr create --base main --title "feat: Track detail screen implementation (TASK-016)" --body "..."
```

## 完了条件チェックリスト

- [ ] `TrackInfoCard`コンポーネントが作成されている
- [ ] `TaskTimelineItem`コンポーネントが作成されている
- [ ] `TaskTimeline`コンポーネントが作成されている
- [ ] `TrackDetailScreen`がZustandストアからトラック情報を取得している
- [ ] タスクのステータスに応じたアイコンと色が表示される
- [ ] タイムラインが正しく表示される
- [ ] トラックが見つからない場合のエラー表示がある
- [ ] TypeScriptコンパイルエラーがない
- [ ] progress.mdが更新されている
- [ ] PRが作成されている

---

🤖 Generated by Manus
