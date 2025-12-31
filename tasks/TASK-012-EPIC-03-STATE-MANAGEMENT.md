# TASK-012: モバイルアプリ状態管理の刷新 (EPIC-03)

## 概要

Zustandストア (`dashboardStore.ts`) を拡張し、新しいデータモデル (`@common/types.ts`) に準拠した状態管理を実装します。

## 参照ドキュメント

- [実装計画書](../docs/implementation/IMPLEMENTATION_PLAN.md)
- [TASK-010: 共有データモデルの定義](./TASK-010-EPIC-01-SHARED-TYPES.md)

## 完了条件

1.  `src/mobile/stores/dashboardStore.ts` をリファクタリングする。
2.  ストアの状態に `projectStatus: ProjectStatus | null` を追加する。
3.  `tracks`, `blockers`, `logs` を `projectStatus` から派生させるセレクターを実装する。
4.  既存の `projects` 状態を削除し、新しいデータ構造に移行する。
5.  `useWebSocket` フックで受信したデータをストアに反映するアクションを実装する。

## 実装詳細

### 1. ストアの状態定義

```typescript
// src/mobile/stores/dashboardStore.ts
import { create } from 'zustand';
import { ProjectStatus, Track, Blocker, ActivityLogEntry } from '@common/types';

interface DashboardState {
  projectStatus: ProjectStatus | null;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  logs: ActivityLogEntry[];

  // Actions
  setProjectStatus: (status: ProjectStatus) => void;
  setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
  addLog: (log: ActivityLogEntry) => void;
  clearLogs: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  projectStatus: null,
  connectionStatus: 'disconnected',
  logs: [],

  setProjectStatus: (status) => set({ projectStatus: status }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 100) })),
  clearLogs: () => set({ logs: [] }),
}));
```

### 2. セレクターの実装

- コンポーネントが必要なデータのみを購読できるように、セレクターを作成します。

```typescript
// Selectors
export const useTracks = () => useDashboardStore((state) => state.projectStatus?.tracks ?? []);
export const useBlockers = () => useDashboardStore((state) => state.projectStatus?.blockers ?? []);
export const useOverallProgress = () => useDashboardStore((state) => ({
  completed: state.projectStatus?.completedTasks ?? 0,
  total: state.projectStatus?.totalTasks ?? 0,
}));
```

### 3. `useWebSocket` フックの更新

- `socket.on('project_status', ...)` のハンドラ内で、受信したデータを `setProjectStatus` に渡すように変更します。

## 検証方法

- `useDashboardStore` と各セレクターをテストコンポーネントで使用し、期待通りのデータが取得できることを確認する。
- WebSocketから `project_status` イベントを受信した際に、ストアの状態が正しく更新されることを確認する。
