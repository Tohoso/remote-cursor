# TASK-010: 共有データモデルの定義 (EPIC-01)

## 概要

サーバーとクライアント間で一貫したデータ構造を確保するため、共有データモデルを定義します。このタスクは、UI/UX刷新の基盤となるデータ層を構築する最初のステップです。

## 参照ドキュメント

- [実装計画書](../docs/implementation/IMPLEMENTATION_PLAN.md)
- [UI/UXワイヤーフレーム仕様書](../docs/implementation/WIREFRAME_SPEC.md)

## 完了条件

1.  `src/common/types.ts` ファイルを新規作成する。
2.  以下のデータモデルのTypeScriptインターフェースを `src/common/types.ts` に定義する。
    - `Track`
    - `Task`
    - `Blocker`
    - `ActivityLogEntry`
3.  各インターフェースには、実装計画書で定義されたプロパティをすべて含める。
4.  サーバー (`src/server`) とモバイルアプリ (`src/mobile`) の両方からこのファイルをインポートして使用できるように、パス設定を調整する。

## 実装詳細

### 1. ファイル作成

- プロジェクトルートに `src/common` ディレクトリを作成します。
- `src/common/types.ts` ファイルを作成します。

### 2. 型定義

以下の内容を `src/common/types.ts` に記述します。

```typescript
// src/common/types.ts

export type TaskStatus = 'done' | 'in_progress' | 'not_started' | 'blocked';
export type TrackStatus = 'active' | 'paused' | 'completed';
export type LogLevel = 'info' | 'warning' | 'error' | 'success';

export interface Track {
  id: string; // e.g., 'mobile-app'
  name: string; // e.g., 'Mobile App'
  agent: string; // e.g., 'Claude-1'
  status: TrackStatus;
  startedAt: string; // ISO 8601
  progress: number; // 0-100
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
}

export interface Task {
  id: string; // e.g., 'TASK-001'
  title: string;
  status: TaskStatus;
  trackId: string;
  startedAt?: string; // ISO 8601
  completedAt?: string; // ISO 8601
  duration?: number; // in minutes
  prNumber?: number;
  prUrl?: string;
  activityLog?: ActivityLogEntry[];
}

export interface Blocker {
  id: string;
  taskId: string;
  reason: string;
  blockedSince: string; // ISO 8601
  impactedTasks: string[];
  resolved: boolean;
  resolvedAt?: string; // ISO 8601
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string; // ISO 8601
  source: string; // e.g., 'claude-1', 'system'
  level: LogLevel;
  message: string;
  taskId?: string;
  metadata?: Record<string, any>;
}

// Server-side ProjectStatus
export interface ProjectStatus {
  lastUpdated: string;
  tracks: Track[];
  blockers: Blocker[];
  overallStatus: string;
  completedTasks: number;
  totalTasks: number;
}
```

### 3. パス設定

- `src/mobile/tsconfig.json` と `src/server/tsconfig.json` の `paths` 設定を更新し、`@common/*` が `src/common/*` を指すようにエイリアスを設定します。

**例 (`tsconfig.json`):**
```json
{
  "compilerOptions": {
    "paths": {
      "@common/*": ["../../common/*"]
    }
  }
}
```

## 検証方法

- `src/server/src/index.ts` と `src/mobile/app/screens/DashboardScreen.tsx` の両方で、`import { Track } from '@common/types';` のようにインポートして、型エラーが発生しないことを確認してください。
- `tsc --noEmit` をサーバーとモバイルの両方のディレクトリで実行し、コンパイルエラーが発生しない。
