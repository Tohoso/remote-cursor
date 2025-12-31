# Contributing to Remote Cursor

## Branch Strategy

このプロジェクトでは、Manus × Claude Code連携開発に最適化されたブランチ戦略を採用しています。

### ブランチ構成

```
main                    # 本番リリース用（保護ブランチ）
├── develop             # 開発統合ブランチ
│   ├── feature/*       # 機能開発ブランチ（Claude Code）
│   ├── manus/*         # Manus作業用ブランチ
│   └── hotfix/*        # 緊急修正用ブランチ
```

| ブランチ | 用途 | 作成者 |
|----------|------|--------|
| `main` | 安定版リリース。直接コミット禁止。 | - |
| `develop` | 開発統合ブランチ。feature完了後にマージ。 | - |
| `feature/{task-id}-{description}` | 機能開発。例: `feature/task-001-init-expo` | Claude Code |
| `manus/{description}` | Manusによる設計変更・ドキュメント更新 | Manus |
| `hotfix/{description}` | 緊急バグ修正 | Claude Code / Manus |

### ワークフロー

#### Claude Codeの作業フロー

1. `develop` ブランチから `feature/{task-id}-{description}` ブランチを作成
2. タスクを実装
3. `progress.md` を更新
4. コミット & プッシュ
5. `develop` へのPRを作成
6. レビュー後マージ

```bash
# 例: TASK-001の作業開始
git checkout develop
git pull origin develop
git checkout -b feature/task-001-init-expo
# ... 実装 ...
git add .
git commit -m "feat(mobile): initialize Expo project with TypeScript template"
git push origin feature/task-001-init-expo
```

#### Manusの作業フロー

1. `develop` ブランチから `manus/{description}` ブランチを作成
2. 設計変更、ドキュメント更新、タスクファイル作成などを実施
3. コミット & プッシュ
4. 必要に応じてPRを作成、または直接 `develop` にマージ

```bash
# 例: 新しいタスクファイルの追加
git checkout develop
git pull origin develop
git checkout -b manus/add-task-002
# ... タスクファイル作成 ...
git add .
git commit -m "docs(tasks): add TASK-002 for navigation setup"
git push origin manus/add-task-002
```

### コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/) に従います。

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

| Type | 用途 |
|------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `style` | コードの意味に影響しない変更（空白、フォーマット等） |
| `refactor` | バグ修正でも機能追加でもないコード変更 |
| `test` | テストの追加・修正 |
| `chore` | ビルドプロセスやツールの変更 |

| Scope | 用途 |
|-------|------|
| `mobile` | モバイルアプリ関連 |
| `server` | PC Agent Server関連 |
| `docs` | ドキュメント関連 |
| `tasks` | タスクファイル関連 |
| `workflow` | ワークフロー設定関連 |

### 例

```
feat(mobile): add bottom navigation with four tabs
fix(server): resolve WebSocket connection timeout issue
docs(tasks): add TASK-003 for dashboard implementation
chore(workflow): update progress.md with completed tasks
```

## Manus ⇔ Claude Code 連携ルール

### Claude CodeからManusへの委譲

1. `tasks/MANUS-REQUEST-{number}-{description}.md` ファイルを作成
2. `manus/request-{number}` ブランチを作成してプッシュ
3. `progress.md` のステータスを「Waiting for Manus」に更新

### ManusからClaude Codeへの回答

1. `tasks/MANUS-RESPONSE-{number}-{description}.md` ファイルを作成
2. `manus/response-{number}` ブランチを作成してプッシュ
3. `develop` にマージ
4. Claude Codeは `develop` をプルして回答を確認

## Pull Request ガイドライン

### PRテンプレート

```markdown
## 概要
[変更内容の簡潔な説明]

## 関連タスク
- TASK-XXX

## 変更内容
- [変更点1]
- [変更点2]

## テスト
- [ ] ユニットテスト追加/更新
- [ ] 動作確認済み

## スクリーンショット（UI変更の場合）
[スクリーンショットを添付]
```

### レビュー基準

- コーディング規約に準拠しているか
- テストが追加されているか
- `progress.md` が更新されているか
- セキュリティ上の問題がないか（security-agentによるレビュー推奨）
