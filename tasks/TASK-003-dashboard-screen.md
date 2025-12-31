# TASK-003: Create Dashboard screen with mock data

## Track Information

| Item | Value |
|------|-------|
| **Track** | Mobile App (Frontend) |
| **Owner** | Claude-1 |
| **Branch** | `feature/mobile/task-003-dashboard` |
| **Directory** | `src/mobile/` |

## 1. Context

TASK-002でボトムナビゲーションが実装されました。次のステップとして、メインのダッシュボード画面を実装します。

UIモックアップ `docs/mockups/01_dashboard.png` を参照してください。

## 2. Requirements

### 2.1 Dashboard Screen Components

ダッシュボード画面には以下のセクションを実装してください：

1.  **Header Section**
    -   アプリ名「Remote Cursor」
    -   接続ステータスインジケーター（緑のドット + "Connected"）

2.  **Project Cards Section**
    -   複数のプロジェクトカードを表示
    -   各カードには以下を含む：
        -   プロジェクト名
        -   現在のタスク/ステータス
        -   担当エージェント名
        -   進捗インジケーター

3.  **Real-time Log Section**
    -   最新のログエントリを表示するスクロール可能なエリア
    -   各ログには：タイムスタンプ、ログレベル（info/warn/error）、メッセージ

### 2.2 Mock Data

実際のサーバー連携は後のタスクで行うため、モックデータを使用してください。

```typescript
// src/mobile/data/mockData.ts
export const mockProjects = [
  {
    id: '1',
    name: 'E-commerce App',
    currentTask: 'Implementing checkout flow',
    agent: 'maker-agent',
    progress: 65,
    status: 'running',
  },
  {
    id: '2',
    name: 'API Server',
    currentTask: 'Waiting for review',
    agent: 'pr-agent',
    progress: 100,
    status: 'idle',
  },
];

export const mockLogs = [
  { id: '1', timestamp: '10:32:15', level: 'info', message: 'Task started: checkout flow' },
  { id: '2', timestamp: '10:32:18', level: 'info', message: 'Creating PaymentForm component' },
  { id: '3', timestamp: '10:32:45', level: 'warn', message: 'API rate limit approaching' },
  // ... more logs
];
```

### 2.3 Component Structure

```
src/mobile/
├── app/
│   └── screens/
│       └── DashboardScreen.tsx  # Update this
├── components/
│   ├── dashboard/
│   │   ├── ProjectCard.tsx
│   │   ├── LogEntry.tsx
│   │   └── StatusIndicator.tsx
│   └── common/
│       └── Card.tsx             # Reusable card component
└── data/
    └── mockData.ts
```

### 2.4 Styling Requirements

モックアップに従い、ダークテーマを使用：

-   背景色: `#1a1a2e`
-   カード背景: `#16213e` または類似の暗い色
-   アクセントカラー: `#6c5ce7`（紫）、`#00b894`（緑/成功）、`#fdcb6e`（黄/警告）、`#e74c3c`（赤/エラー）
-   テキスト: 白 (`#ffffff`) またはグレー (`#a0a0a0`)

## 3. Acceptance Criteria

-   [ ] ダッシュボード画面がモックアップに近いデザインで表示される
-   [ ] プロジェクトカードが正しく表示される
-   [ ] ログセクションがスクロール可能
-   [ ] ステータスインジケーターが色分けされている
-   [ ] コンポーネントが適切に分割されている

## 4. Priority

**High** - ダッシュボードはアプリの中心的な画面です。

## 5. Agent Delegation

This task should be handled by **maker-agent**.

## 6. Notes for Claude-1

-   You are working on the **Mobile App** track.
-   Your code should be entirely within `src/mobile/`.
-   Do not modify files in `src/server/` (that's Claude-2's territory).
-   Update the **Mobile App Timeline** section in `progress.md` when done.
