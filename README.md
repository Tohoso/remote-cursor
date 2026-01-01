# Remote Cursor

Claude Code開発プロセスをリアルタイムで監視するモバイルアプリケーションとサーバー。

## 概要

Remote Cursorは、Claude Codeによる開発プロセスを可視化し、ブロッカーの早期検出と解決を支援するツールです。

## 機能

- 📊 **リアルタイム進捗監視**: タスクの進捗状況をリアルタイムで表示
- 🚨 **ブロッカーアラート**: 問題発生時に即座に通知
- 📝 **アクティビティログ**: 開発プロセスの詳細なログを表示
- 📱 **プッシュ通知**: 重要なイベントをモバイルに通知
- 🎯 **トラック詳細**: 開発トラックごとのタスクタイムライン表示
- 💬 **指示送信**: ブロッカー解決のための指示をClaude Codeに送信

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

デバイス選択：
- **iOS**: `i` キーを押す
- **Android**: `a` キーを押す
- **Web**: `w` キーを押す

## 技術スタック

### Mobile App
- React Native (Expo)
- TypeScript
- Zustand (状態管理)
- React Navigation
- Socket.IO Client
- Expo Notifications

### Server
- Node.js
- Express
- Socket.IO
- TypeScript
- Chokidar (ファイル監視)
- expo-server-sdk (プッシュ通知)

## 開発ワークフロー

このプロジェクトは **Manus × Claude Code** コラボレーションワークフローを使用しています。

- **Manus**: オーケストレーション、設計、PRレビュー
- **Claude Code**: 実装、テスト、デバッグ

詳細は `CLAUDE.md` を参照してください。

## 主要機能

### ダッシュボード画面
- プロジェクト全体の進捗サマリー（円形プログレスチャート）
- 開発トラック一覧と進捗状況
- ブロッカーアラート表示

### トラック詳細画面
- トラック情報（名前、ステータス、担当エージェント）
- タスクタイムライン（ステータスアイコン付き）

### ブロッカー詳細画面
- ブロッカー情報（理由、影響タスク、検出日時）
- 解決指示送信フォーム

### アクティビティログ画面
- リアルタイムログストリーム
- ソース別フィルタリング
- パフォーマンス最適化

### プッシュ通知
- ブロッカー検出時の自動通知
- タスク更新通知

## 環境変数

### サーバー

```env
PORT=3001
PROGRESS_FILE_PATH=../../progress.md
```

### モバイルアプリ

```env
EXPO_PUBLIC_SOCKET_URL=http://localhost:3001
```

物理デバイスでテストする場合は、`localhost` をPCのローカルIPアドレスに変更してください。

## ビルドとデプロイ

### モバイルアプリ

```bash
# EAS Build
cd src/mobile
npx eas build --platform ios
npx eas build --platform android
```

### サーバー

```bash
cd src/server
npm run build
npm start
```

## トラブルシューティング

### モバイルアプリが接続できない
1. サーバーが起動しているか確認
2. 同じネットワークに接続しているか確認
3. WebSocket URLが正しいか確認（物理デバイスの場合はIPアドレスを使用）

### プッシュ通知が届かない
1. 実機でテストしているか確認（シミュレータではプッシュ通知は動作しません）
2. 通知許可が付与されているか確認
3. サーバーにプッシュトークンが登録されているか確認

## ドキュメント

- [モバイルアプリREADME](./src/mobile/README.md)
- [サーバーREADME](./src/server/README.md)
- [進捗管理](./progress.md)
- [設計ドキュメント](./docs/design/)
- [要件定義](./docs/requirements/)

## ライセンス

MIT

## サポート

問題や質問がある場合は、GitHubのIssueを作成してください。
