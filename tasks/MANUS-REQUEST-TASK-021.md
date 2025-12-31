# MANUS-REQUEST: TASK-021 ドキュメントとクリーンアップ

**Requested By**: Manus  
**Timestamp**: 2025-01-01  
**Priority**: Medium  
**Track**: mobile-app (CC1) + server (CC2)

---

## 指示

TASK-021（ドキュメントとクリーンアップ）を実装してください。

プロジェクトの最終仕上げとして、ドキュメントの更新と不要なコードの削除を行います。

## 前提条件

- ✅ Sprint 2 全タスク完了（TASK-010〜020）

## 参照ドキュメント

1. **タスク仕様書**: `tasks/TASK-016-EPIC-07-TRACK-DETAIL.md` (TASK-021セクション)

---

## 実装手順

### Part 1: クライアントサイド (CC1 - mobile-app)

#### 1.1 ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile-app/task-021-cleanup
```

#### 1.2 不要なコンポーネントの削除

以下のファイルが存在する場合は削除：

```bash
# 古いコンポーネント
rm -f src/mobile/components/ProjectCard.tsx
rm -f src/mobile/components/StatusIndicator.tsx

# 使用されていないファイル
rm -f src/mobile/components/LogEntry.tsx  # activity/LogEntry.tsxに移行済み
```

#### 1.3 コンポーネントのエクスポート整理

`src/mobile/components/index.ts` を作成/更新：

```typescript
// Dashboard components
export * from './dashboard';

// Track components
export * from './track';

// Blocker components
export * from './blocker';

// Activity components
export * from './activity';
```

#### 1.4 型定義の整理

`src/common/types/index.ts` を確認し、未使用の型を削除。

#### 1.5 リンティングとフォーマット

```bash
cd src/mobile
npm run lint --fix
npm run format  # または npx prettier --write .
```

#### 1.6 README.mdの更新

`src/mobile/README.md` を作成/更新：

```markdown
# Remote Cursor Mobile App

Claude Code開発プロセスをリアルタイムで監視するモバイルアプリケーション。

## 機能

### ダッシュボード
- プロジェクト全体の進捗サマリー（円形プログレスチャート）
- 開発トラック一覧と各トラックの進捗状況
- ブロッカーアラート（警告バナー）

### トラック詳細
- トラック情報カード（名前、ステータス、担当エージェント）
- タスクタイムライン（ステータスアイコン付き）

### ブロッカー詳細
- ブロッカー情報カード（理由、影響タスク、検出日時）
- 解決指示送信フォーム（WebSocket経由）

### アクティビティログ
- リアルタイムログストリーム
- ソース別フィルタリング（claude-1, claude-2, system, websocket）
- パフォーマンス最適化されたFlatList

## 技術スタック

- **Framework**: React Native (Expo)
- **State Management**: Zustand
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Real-time**: Socket.IO Client
- **Styling**: theme.ts (カスタムテーマシステム)

## ディレクトリ構造

\`\`\`
src/mobile/
├── App.tsx                 # エントリーポイント
├── components/
│   ├── dashboard/          # ダッシュボードコンポーネント
│   ├── track/              # トラック詳細コンポーネント
│   ├── blocker/            # ブロッカー詳細コンポーネント
│   └── activity/           # アクティビティログコンポーネント
├── screens/
│   ├── DashboardScreen.tsx
│   ├── TrackDetailScreen.tsx
│   ├── BlockerDetailScreen.tsx
│   └── ActivityLogScreen.tsx
├── navigation/
│   ├── types.ts            # ナビゲーション型定義
│   └── BottomTabNavigator.tsx
├── stores/
│   └── dashboardStore.ts   # Zustand状態管理
├── hooks/
│   ├── useWebSocket.ts     # WebSocket接続フック
│   └── usePushNotifications.ts
└── theme.ts                # テーマ定義
\`\`\`

## セットアップ

\`\`\`bash
cd src/mobile
npm install
npx expo start
\`\`\`

## 開発

\`\`\`bash
# iOS シミュレーター
npx expo start --ios

# Android エミュレーター
npx expo start --android

# リンティング
npm run lint

# 型チェック
npm run typecheck
\`\`\`
```

#### 1.7 PR作成 (CC1)

```bash
git add .
git commit -m "chore: Cleanup and documentation (TASK-021 client)"
git push origin feature/mobile-app/task-021-cleanup
gh pr create --base main --title "chore: Mobile app cleanup and documentation (TASK-021)" --body "..."
```

---

### Part 2: サーバーサイド (CC2 - server)

#### 2.1 ブランチ作成

```bash
git checkout develop
git pull origin develop
git checkout -b feature/server/task-021-cleanup
```

#### 2.2 不要なコードの削除

以下を確認し、未使用のコードを削除：

```bash
# 古いハンドラやユーティリティ
# 使用されていないインポート
# コメントアウトされたコード
```

#### 2.3 リンティングとフォーマット

```bash
cd src/server
npm run lint --fix
npm run format  # または npx prettier --write .
```

#### 2.4 README.mdの更新

`src/server/README.md` を作成/更新：

```markdown
# Remote Cursor Server

Claude Code開発プロセスを監視し、モバイルアプリにリアルタイムで配信するサーバー。

## 機能

### WebSocket通信
- `project_status`: プロジェクト全体の状態を配信
- `task_update`: 個別タスクの更新を配信
- `blocker_alert`: ブロッカー検出を配信
- `log_entry`: ログエントリを配信
- `instruction`: クライアントからの指示を受信

### progress.md解析
- Markdownファイルの変更を監視
- 差分検出による効率的な更新
- タスクステータスの自動追跡

### プッシュ通知
- Expo Push Notificationsによるブロッカーアラート
- トークン管理

## 技術スタック

- **Runtime**: Node.js
- **Framework**: Express
- **Real-time**: Socket.IO
- **File Watching**: chokidar
- **Push Notifications**: expo-server-sdk

## ディレクトリ構造

\`\`\`
src/server/
├── index.ts                # エントリーポイント
├── websocket/
│   └── handlers.ts         # WebSocketイベントハンドラ
├── services/
│   ├── progressParser.ts   # progress.md解析
│   └── pushNotificationService.ts
└── utils/
    └── ...
\`\`\`

## セットアップ

\`\`\`bash
cd src/server
npm install
npm run dev
\`\`\`

## 環境変数

\`\`\`env
PORT=3000
PROGRESS_FILE_PATH=../../progress.md
\`\`\`

## API

### WebSocket Events

| Event | Direction | Description |
|:---|:---|:---|
| `project_status` | Server → Client | プロジェクト全体の状態 |
| `task_update` | Server → Client | 個別タスクの更新 |
| `blocker_alert` | Server → Client | ブロッカー検出 |
| `log_entry` | Server → Client | ログエントリ |
| `instruction` | Client → Server | ユーザー指示 |
| `register_push_token` | Client → Server | プッシュトークン登録 |
```

#### 2.5 PR作成 (CC2)

```bash
git add .
git commit -m "chore: Cleanup and documentation (TASK-021 server)"
git push origin feature/server/task-021-cleanup
gh pr create --base main --title "chore: Server cleanup and documentation (TASK-021)" --body "..."
```

---

### Part 3: プロジェクトルートのREADME更新

どちらかのトラックで実施：

`README.md` (プロジェクトルート) を更新：

```markdown
# Remote Cursor

Claude Code開発プロセスをリアルタイムで監視するモバイルアプリケーションとサーバー。

## 概要

Remote Cursorは、Claude Codeによる開発プロセスを可視化し、ブロッカーの早期検出と解決を支援するツールです。

## 機能

- 📊 **リアルタイム進捗監視**: タスクの進捗状況をリアルタイムで表示
- 🚨 **ブロッカーアラート**: 問題発生時に即座に通知
- 📝 **アクティビティログ**: 開発プロセスの詳細なログを表示
- 📱 **プッシュ通知**: 重要なイベントをモバイルに通知

## アーキテクチャ

\`\`\`
┌─────────────────┐     WebSocket      ┌─────────────────┐
│   Mobile App    │◄──────────────────►│     Server      │
│  (React Native) │                    │   (Node.js)     │
└─────────────────┘                    └────────┬────────┘
                                                │
                                                │ File Watch
                                                ▼
                                       ┌─────────────────┐
                                       │  progress.md    │
                                       └─────────────────┘
\`\`\`

## ディレクトリ構造

\`\`\`
remote-cursor/
├── src/
│   ├── mobile/         # React Native アプリ
│   ├── server/         # Node.js サーバー
│   └── common/         # 共有型定義
├── docs/               # ドキュメント
├── tasks/              # タスク管理
└── progress.md         # 進捗管理ファイル
\`\`\`

## セットアップ

### サーバー

\`\`\`bash
cd src/server
npm install
npm run dev
\`\`\`

### モバイルアプリ

\`\`\`bash
cd src/mobile
npm install
npx expo start
\`\`\`

## 開発ワークフロー

このプロジェクトは **Manus × Claude Code** コラボレーションワークフローを使用しています。

- **Manus**: オーケストレーション、設計、PRレビュー
- **Claude Code**: 実装、テスト、デバッグ

## ライセンス

MIT
```

---

## progress.md の更新

タスク完了後、`progress.md` を以下のように更新：

```markdown
| TASK-021 | mobile-app + server | ドキュメントとクリーンアップ | ✅ Done | - |
```

## 完了条件チェックリスト

### クライアント (CC1)
- [ ] 不要なコンポーネントが削除されている
- [ ] コンポーネントのエクスポートが整理されている
- [ ] リンティングエラーがない
- [ ] `src/mobile/README.md`が作成されている

### サーバー (CC2)
- [ ] 不要なコードが削除されている
- [ ] リンティングエラーがない
- [ ] `src/server/README.md`が作成されている

### 共通
- [ ] プロジェクトルートの`README.md`が更新されている
- [ ] progress.mdが更新されている

---

🤖 Generated by Manus
