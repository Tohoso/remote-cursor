# Remote Cursor

Claude Code開発プロセスをリアルタイムで監視するモバイルアプリケーションとサーバー。

## 概要

Remote Cursorは、Claude Codeによる開発プロセスを可視化し、ブロッカーの早期検出と解決を支援するツールです。

## 機能

- 📊 **リアルタイム進捗監視**: タスクの進捗状況をリアルタイムで表示
- 🚨 **ブロッカーアラート**: 問題発生時に即座に通知
- 📝 **アクティビティログ**: 開発プロセスの詳細なログを表示
- 📱 **プッシュ通知**: 重要なイベントをモバイルに通知
- 🎯 **トラック詳細**: 各開発トラックのタスク進捗をタイムライン表示
- 🔍 **ブロッカー管理**: ブロッカーの詳細確認と解決指示の送信

## アーキテクチャ

```
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
```

## ディレクトリ構造

```
remote-cursor/
├── src/
│   ├── mobile/         # React Native アプリ
│   ├── server/         # Node.js サーバー
│   └── common/         # 共有型定義
├── docs/               # ドキュメント
├── tasks/              # タスク管理
└── progress.md         # 進捗管理ファイル
```

## セットアップ

### サーバー

```bash
cd src/server
npm install
npm run dev
```

### モバイルアプリ

```bash
cd src/mobile
npm install
npx expo start
```

## 画面構成

### ダッシュボード

プロジェクト全体の進捗を一目で確認できます。

- **進捗サマリーカード**: 円形プログレスチャートでタスク完了率を表示
- **トラックカード**: 各開発トラック（mobile-app, server, common）の状態と最新タスク
- **ブロッカーアラート**: 検出されたブロッカーを警告バナーで表示

### トラック詳細画面

特定のトラックのタスク一覧をタイムライン形式で表示します。

- トラック情報（名前、ステータス、担当エージェント、進捗率）
- タスクタイムライン（各タスクのステータスアイコン付き）
- タップでタスク詳細に遷移

### ブロッカー詳細画面

ブロッカーの詳細情報と解決指示を送信できます。

- ブロッカー情報カード（理由、影響タスク、検出日時）
- 解決指示フォーム（WebSocket経由でサーバーに送信）

### アクティビティログ画面

リアルタイムで更新されるログストリームを表示します。

- ソース別フィルタリング（claude-1, claude-2, system, websocket）
- ログレベル別カラーコーディング
- パフォーマンス最適化されたFlatList

## 技術スタック

### Mobile App
- React Native (Expo)
- TypeScript
- Zustand (状態管理)
- React Navigation (ナビゲーション)
- Socket.IO Client (リアルタイム通信)
- Expo Notifications (プッシュ通知)
- Custom Theme System

### Server
- Node.js
- Express
- Socket.IO (WebSocket)
- TypeScript
- Chokidar (ファイル監視)
- Expo Server SDK (プッシュ通知)

### Shared
- TypeScript 型定義 (`@common/types`)
- WebSocket イベントスキーマ

## WebSocket イベント

### Server → Client

| Event | Description |
|:---|:---|
| `connection_status` | 接続確立通知 |
| `project_status` | プロジェクト全体の状態配信 |
| `task_update` | 個別タスクの更新配信 |
| `blocker_alert` | ブロッカー検出配信 |
| `log_update` | ログエントリ配信 |

### Client → Server

| Event | Description |
|:---|:---|
| `instruction` | ユーザー指示送信 |
| `register_push_token` | プッシュ通知トークン登録 |
| `unregister_push_token` | プッシュ通知トークン解除 |

## 開発ワークフロー

このプロジェクトは **Manus × Claude Code** コラボレーションワークフローを使用しています。

- **Manus**: オーケストレーション、設計、PRレビュー
- **Claude Code**: 実装、テスト、デバッグ

詳細は [CLAUDE.md](./CLAUDE.md) を参照してください。

## プロジェクトステータス

現在の進捗は [progress.md](./progress.md) で管理されています。

**Sprint 2**: UI/UX Overhaul - ✅ 完了

## ドキュメント

- [Requirements (Japanese)](./docs/requirements/requirements_definition.md)
- [Architecture Design (Japanese)](./docs/design/architecture_design.md)
- [Implementation Plan](./docs/implementation/IMPLEMENTATION_PLAN.md)
- [Wireframe Specification](./docs/implementation/WIREFRAME_SPEC.md)
- [Mobile App README](./src/mobile/README.md)
- [Server README](./src/server/README.md)

## ライセンス

MIT

## サポート

問題や質問がある場合は、GitHubでissueを作成してください。

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
