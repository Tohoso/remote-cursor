# Remote Cursor

スマートフォンからPC上のCursor/VSCode開発環境を監視・操作するためのモバイルアプリケーション。

## 概要

**Remote Cursor** は、AIエージェントによる開発タスクの実行状況を、場所を問わずにスマートフォンから監視・操作できるようにするアプリケーションです。

### 主な機能

| 機能 | 説明 |
|------|------|
| **監視ダッシュボード** | プロジェクトの進捗、タスク状況、リアルタイムログを一目で確認 |
| **指示入力** | エージェントへの新しいタスク指示をスマホから送信 |
| **Web IDE** | code-server経由でVSCode環境をリモート操作 |
| **画面共有** | WebRTCによるオンデマンドのPC画面ストリーミング |
| **プッシュ通知** | タスク完了、エラー発生などの重要イベントを通知 |

## アーキテクチャ

```
┌─────────────────┐         ┌─────────────────────────────────┐
│  Mobile App     │◄───────►│  PC (Development Environment)  │
│  (React Native) │         │  ┌─────────────────────────┐    │
│                 │  Tailscale  │  PC Agent Server      │    │
│  - Dashboard    │◄───────►│  │  (Node.js + WebSocket) │    │
│  - Web IDE      │         │  └─────────────────────────┘    │
│  - Screen Share │         │  ┌─────────────────────────┐    │
│                 │◄───────►│  │  code-server           │    │
└─────────────────┘         │  └─────────────────────────┘    │
                            │  ┌─────────────────────────┐    │
                            │  │  Cursor/VSCode          │    │
                            │  └─────────────────────────┘    │
                            └─────────────────────────────────┘
```

## 開発ワークフロー

このプロジェクトは **Manus × Claude Code 連携開発ワークフロー** を採用しています。

| 役割 | 担当 |
|------|------|
| オーケストレーション、リサーチ、設計 | Manus |
| 実装、テスト、デバッグ | Claude Code |

詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## ディレクトリ構成

```
remote-cursor/
├── .claude/              # Claude Code用設定
│   ├── agents/           # Subagent定義
│   └── skills/           # Skill定義
├── docs/                 # ドキュメント
│   ├── requirements/     # 要件定義
│   ├── design/           # アーキテクチャ設計
│   └── mockups/          # UIモックアップ
├── tasks/                # タスクファイル
├── src/                  # ソースコード
│   ├── mobile/           # React Nativeアプリ
│   └── server/           # PC Agent Server
├── CLAUDE.md             # プロジェクト設定
├── progress.md           # 進捗追跡
└── CONTRIBUTING.md       # コントリビューションガイド
```

## 技術スタック

### モバイルアプリ
- React Native (Expo)
- TypeScript
- NativeWind (TailwindCSS)
- React Navigation

### PC Agent Server
- Node.js
- Express
- WebSocket (ws)
- chokidar (ファイル監視)

### インフラ
- Tailscale (セキュアネットワーク)
- code-server (Web IDE)
- WebRTC (画面共有)

## ドキュメント

- [要件定義書](./docs/requirements/requirements_definition.md)
- [アーキテクチャ設計書](./docs/design/architecture_design.md)
- [UIモックアップ](./docs/mockups/)

## ライセンス

MIT License

## 開発状況

現在の進捗は [progress.md](./progress.md) を参照してください。
