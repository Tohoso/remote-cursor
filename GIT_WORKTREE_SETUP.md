# Git Worktreeによる並行開発環境の構築ガイド

## 1. Git Worktreeとは？

Git Worktreeは、1つのGitリポジトリから複数の「作業ディレクトリ」を作成するための機能です。これにより、各作業ディレクトリで異なるブランチを同時にチェックアウトして作業できます。

### なぜWorktreeを使うのか？

- **ブランチの混線防止**: 1つのディレクトリで複数のターミナルを使うと、`git checkout`が共有されてしまい、ブランチが意図せず切り替わってしまいます。Worktreeはディレクトリレベルで作業環境を分離するため、この問題を完全に解決します。
- **効率性**: リポジトリ全体を2回クローンするのに比べ、`.git`ディレクトリは共有されるため、ディスク容量を節約でき、セットアップも高速です。

### 今回の構成

| 作業ディレクトリ | 担当エージェント | 担当トラック |
|:---|:---|:---|
| `~/remote-cursor/` | Claude-1 | Mobile App |
| `~/remote-cursor-server/` | Claude-2 | PC Server |

## 2. セットアップ手順

以下のコマンドを**1回だけ**実行してください。

```bash
# 1. メインリポジトリに移動
cd /home/ubuntu/remote-cursor

# 2. 最新の状態に更新
git checkout develop
git pull origin develop

# 3. 既存のWorktreeがあれば削除（初回は不要）
git worktree remove ../remote-cursor-server --force || true

# 4. PC Server用のWorktreeを作成
# これにより、隣に`remote-cursor-server`ディレクトリが作成されます
git worktree add ../remote-cursor-server develop

# 5. 確認
ls -ld /home/ubuntu/remote-cursor-server
```

## 3. 開発の進め方

**重要**: Cursor（またはVSCode）を**2つの別々のウィンドウ**で開いてください。

- **ウィンドウ1（Claude-1: Mobile App）**:
  - `~/remote-cursor` ディレクトリを開く
  - `feature/mobile/*` ブランチで作業

- **ウィンドウ2（Claude-2: PC Server）**:
  - `~/remote-cursor-server` ディレクトリを開く
  - `feature/server/*` ブランチで作業

これにより、2つのClaude Codeインスタンスが互いに干渉することなく、それぞれのブランチで安全に並行開発を進めることができます。
