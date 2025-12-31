# Gap Analysis: 現在の実装 vs 理想UI

**作成日**: 2025年12月31日

---

## 概要

本ドキュメントは、現在のRemote Cursor実装と、ワイヤーフレームで定義した理想UIとの差分を分析し、実装が必要な機能を特定します。

---

## 1. ダッシュボード画面

### 現在の実装

| コンポーネント | 実装状況 | 詳細 |
|:---|:---:|:---|
| ヘッダー（タイトル） | ✅ | 「Remote Cursor」表示済み |
| 接続ステータス | ✅ | StatusIndicatorコンポーネントで実装済み |
| 最終更新時刻 | ❌ | 未実装 |
| 進捗サマリーカード | ❌ | 円形プログレス、ステータスボックス未実装 |
| トラックカード | 🟡 | ProjectCardとして存在するが、トラック概念なし |
| タスクプレビュー | ❌ | カード内のタスク一覧未実装 |
| ブロッカーアラート | ❌ | 未実装 |
| ボトムナビゲーション | ✅ | BottomTabNavigatorで実装済み |

### 必要な変更

1. **ProgressSummaryCard** コンポーネントの新規作成
2. **TrackCard** コンポーネントの新規作成（ProjectCardを拡張）
3. **BlockerAlert** コンポーネントの新規作成
4. **LastUpdated** 表示の追加
5. dashboardStoreの拡張（tracks, blockers対応）

---

## 2. トラック詳細画面

### 現在の実装

**画面自体が存在しない**（新規作成が必要）

### 必要な変更

1. **TrackDetailScreen** 画面の新規作成
2. **TrackInfoCard** コンポーネントの新規作成
3. **TaskTimeline** コンポーネントの新規作成
4. **TaskTimelineItem** コンポーネントの新規作成
5. **ActivityLogSection** コンポーネントの新規作成
6. ナビゲーションの追加（Dashboard → TrackDetail）

---

## 3. ブロッカー詳細画面

### 現在の実装

**画面自体が存在しない**（新規作成が必要）

### 必要な変更

1. **BlockerDetailScreen** 画面の新規作成
2. **BlockerCountBanner** コンポーネントの新規作成
3. **BlockerCard** コンポーネントの新規作成
4. **ResolveBlockerForm** コンポーネントの新規作成
5. **QuickResponseChips** コンポーネントの新規作成
6. **BlockerHistory** コンポーネントの新規作成
7. ナビゲーションの追加

---

## 4. アクティビティログ画面

### 現在の実装

| コンポーネント | 実装状況 | 詳細 |
|:---|:---:|:---|
| LogEntryコンポーネント | ✅ | 基本実装あり |
| ログ一覧表示 | ✅ | DashboardScreen内に埋め込み |
| 専用画面 | ❌ | 独立した画面なし |
| フィルターチップ | ❌ | 未実装 |
| Liveインジケーター | ❌ | 未実装 |
| オートスクロール | ❌ | 未実装 |
| エージェント別アイコン | ❌ | 未実装 |

### 必要な変更

1. **ActivityLogScreen** 画面の新規作成
2. **FilterChips** コンポーネントの新規作成
3. **LiveIndicator** コンポーネントの新規作成
4. **LogEntry** コンポーネントの拡張（エージェントアイコン、詳細表示）
5. **JumpToLatestButton** コンポーネントの新規作成
6. ナビゲーションの追加

---

## 5. サーバー側（PC Agent Server）

### 現在の実装

| 機能 | 実装状況 | 詳細 |
|:---|:---:|:---|
| FileWatcher | ✅ | progress.md監視済み |
| ProgressParser | ✅ | 基本的なパース実装済み |
| WebSocket broadcast | ✅ | project_status送信済み |
| トラック情報抽出 | 🟡 | 基本実装あり、拡張必要 |
| タスク情報抽出 | 🟡 | 基本実装あり、拡張必要 |
| ブロッカー検知 | ❌ | 未実装 |
| ログストリーミング | ❌ | 未実装 |

### 必要な変更

1. **ProgressParser** の拡張
   - ブロッカー情報の抽出
   - タスクの詳細情報（開始時刻、所要時間、PR番号）
   - タイムライン形式のデータ構造
2. **BlockerDetector** サービスの新規作成
3. **LogStreamer** サービスの新規作成
4. WebSocketイベントの追加
   - `track_update`
   - `task_update`
   - `blocker_alert`
   - `log_entry`

---

## 6. データモデルの差分

### 現在のデータモデル

```typescript
// Project (Mobile App)
interface Project {
  id: string;
  name: string;
  currentTask: string;
  agent: string;
  status: 'running' | 'idle' | 'error';
  progress: number;
}

// ProjectStatus (Server)
interface ProjectStatus {
  lastUpdated: string;
  tracks: TrackStatus[];
  tasks: TaskStatus[];
  overallStatus: string;
  completedTasks: number;
  totalTasks: number;
}
```

### 理想のデータモデル

```typescript
// Track
interface Track {
  id: string;
  name: string;
  agent: string;
  status: 'active' | 'paused' | 'completed';
  startedAt: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
}

// Task
interface Task {
  id: string;
  title: string;
  status: 'done' | 'in_progress' | 'not_started' | 'blocked';
  trackId: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  prNumber?: string;
  prUrl?: string;
  activityLog?: ActivityLogEntry[];
}

// Blocker
interface Blocker {
  id: string;
  taskId: string;
  reason: string;
  blockedSince: string;
  impactedTasks: string[];
  resolved: boolean;
  resolvedAt?: string;
}

// ActivityLogEntry
interface ActivityLogEntry {
  id: string;
  timestamp: string;
  source: 'claude-1' | 'claude-2' | 'system';
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  taskId?: string;
  metadata?: Record<string, any>;
}
```

---

## 7. 実装優先度

### Phase 1: 基盤整備（必須）

1. データモデルの統一（Server/Mobile共通型定義）
2. ProgressParserの拡張
3. dashboardStoreの拡張

### Phase 2: ダッシュボード強化

4. ProgressSummaryCard
5. TrackCard（タスクプレビュー付き）
6. BlockerAlert

### Phase 3: 新規画面

7. TrackDetailScreen + コンポーネント群
8. BlockerDetailScreen + コンポーネント群
9. ActivityLogScreen + コンポーネント群

### Phase 4: リアルタイム機能

10. ログストリーミング
11. ブロッカー検知・通知
12. プッシュ通知

---

## 8. 工数見積もり

| Phase | タスク数 | 想定工数 |
|:---|:---:|:---:|
| Phase 1 | 3 | 2-3日 |
| Phase 2 | 3 | 2-3日 |
| Phase 3 | 9 | 5-7日 |
| Phase 4 | 3 | 2-3日 |
| **合計** | **18** | **11-16日** |

---

## 次のステップ

1. 各Phaseをタスクファイル（TASK-XXX.md）に分割
2. 依存関係を定義
3. Claude Codeに割り当て可能な粒度に調整
