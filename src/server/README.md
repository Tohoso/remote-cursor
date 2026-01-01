# Remote Cursor Server

Claude Code開発プロセスを監視し、モバイルアプリにリアルタイムで配信するサーバー。

## 機能

### WebSocket通信
- `project_status`: プロジェクト全体の状態を配信
- `task_update`: 個別タスクの更新を配信
- `blocker_alert`: ブロッカー検出を配信
- `log_update`: ログエントリを配信
- `instruction`: クライアントからの指示を受信
- `register_push_token`: プッシュ通知トークン登録
- `unregister_push_token`: プッシュ通知トークン解除

### progress.md解析
- Markdownファイルの変更を監視
- 差分検出による効率的な更新
- タスクステータスの自動追跡
- ブロッカーの自動検出

### プッシュ通知
- Expo Push Notificationsによるブロッカーアラート
- タスク更新通知
- トークン管理と検証

## 技術スタック

- **Runtime**: Node.js
- **Framework**: Express
- **Real-time**: Socket.IO
- **File Watching**: chokidar
- **Push Notifications**: expo-server-sdk
- **Language**: TypeScript

## ディレクトリ構造

```
src/server/
├── src/
│   ├── index.ts                # エントリーポイント
│   ├── app.ts                  # Express アプリケーション
│   ├── config/
│   │   └── index.ts            # 設定管理
│   ├── routes/
│   │   └── index.ts            # API ルート
│   ├── websocket/
│   │   └── index.ts            # WebSocket イベントハンドラ
│   └── services/
│       ├── progressParser.ts   # progress.md 解析
│       ├── fileWatcher.ts      # ファイル監視
│       ├── instructionHandler.ts # 指示ハンドラ
│       └── pushNotificationService.ts # プッシュ通知サービス
├── package.json
└── tsconfig.json
```

## セットアップ

```bash
cd src/server
npm install
npm run dev
```

## 環境変数

`.env` ファイルを作成して以下を設定：

```env
PORT=3000
LOG_LEVEL=info
```

## API

### HTTP Endpoints

| Method | Path | Description |
|:---|:---|:---|
| GET | `/` | サーバーステータス |
| GET | `/health` | ヘルスチェック |

### WebSocket Events

#### Server → Client

| Event | Description | Payload |
|:---|:---|:---|
| `connection_status` | 接続確立通知 | `{ type, message, timestamp }` |
| `project_status` | プロジェクト全体の状態 | `{ type, data: ProjectStatus, timestamp }` |
| `task_update` | 個別タスクの更新 | `{ type, data: Task, timestamp }` |
| `blocker_alert` | ブロッカー検出 | `{ type, data: Blocker, timestamp }` |
| `log_update` | ログエントリ | `{ type, data: LogEntry, timestamp }` |
| `instruction_received` | 指示受信確認 | `{ type, message, filename, timestamp }` |
| `push_token_registered` | プッシュトークン登録完了 | `{ type, success, message, timestamp }` |
| `error` | エラー通知 | `{ type, message, timestamp }` |

#### Client → Server

| Event | Description | Payload |
|:---|:---|:---|
| `instruction` | ユーザー指示 | `{ instruction: string }` |
| `register_push_token` | プッシュトークン登録 | `{ token: string }` |
| `unregister_push_token` | プッシュトークン解除 | `{ token: string }` |
| `ping` | 接続テスト | - |

## 開発

### ビルド

```bash
npm run build
```

### テスト

```bash
# ユニットテスト実行
npm test

# テスト監視モード
npm run test:watch

# カバレッジレポート
npm run test:coverage
```

### 本番起動

```bash
npm run build
npm start
```

## アーキテクチャ

### ProgressParser

`progress.md` ファイルを解析し、`ProjectStatus` オブジェクトに変換します。

- **差分検出**: 前回の状態と比較し、変更箇所のみを抽出
- **Major Change判定**: トラック数の変更など大きな構造変化を検出
- **ブロッカー抽出**: `⏳ Blocked` や `🔴 Error` ステータスからブロッカーを自動検出

### FileWatcher

`chokidar` を使用して `progress.md` の変更を監視し、変更時に `ProgressParser` を実行します。

### PushNotificationService

Expo Push Notifications SDK を使用してモバイルデバイスにプッシュ通知を送信します。

- **トークン管理**: 複数デバイスのトークンを管理
- **通知送信**: チャンク分割による大量通知対応
- **エラーハンドリング**: 詳細なログと失敗時のリトライ

## ライセンス

MIT
