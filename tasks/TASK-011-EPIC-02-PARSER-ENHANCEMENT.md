# TASK-011: サーバーサイドパーサーの強化 (EPIC-02)

## 概要

`progress.md` をパースする `progressParser.ts` を更新し、新しく定義された共有データモデル (`@common/types.ts`) に準拠したリッチなJSONオブジェクトを出力するようにします。

## 参照ドキュメント

- [実装計画書](../docs/implementation/IMPLEMENTATION_PLAN.md)
- [TASK-010: 共有データモデルの定義](./TASK-010-EPIC-01-SHARED-TYPES.md)

## 完了条件

1.  `src/server/src/services/progressParser.ts` をリファクタリングする。
2.  `parseProgress` メソッドが `ProjectStatus` 型 (`@common/types.ts` で定義) のオブジェクトを返すようにする。
3.  `progress.md` から以下の情報をすべて抽出できるようにする。
    - 各トラックの情報（担当エージェント、ステータス、タスクリスト）
    - 各タスクの詳細情報（ステータス、PR番号など）
    - ブロッカー情報
4.  `progress.md` のフォーマットが変更されても、ある程度堅牢に動作するように正規表現を改善する。
5.  ユニットテスト (`progressParser.test.ts`) を作成し、カバレッジを80%以上にする。

## 実装詳細

### 1. 依存関係のインポート

- `progressParser.ts` の先頭で、`@common/types` から新しい型定義をインポートします。

```typescript
import { ProjectStatus, Track, Task, Blocker, TaskStatus, TrackStatus } from '@common/types';
```

### 2. `parseProgress` メソッドの修正

- `parseProgress` メソッドの戻り値の型を `ProjectStatus` に変更します。
- メソッド内で各抽出関数を呼び出し、`ProjectStatus` オブジェクトを構築します。

### 3. 抽出ロジックの強化

- **`extractTracks`**: `progress.md` の `### Track: ...` セクションをパースするようにします。各トラック内のタスクテーブルも再帰的にパースし、`Track` オブジェクトを構築します。
- **`extractBlockers`**: `## Blockers` セクションをパースし、`Blocker` オブジェクトの配列を生成します。
- **`determineOverallStatus`**: ブロッカーの有無や各タスクのステータスを総合的に判断して、より正確な全体ステータスを返すようにします。

### 4. 正規表現の改善

- 現在の正規表現はテーブルの列数に強く依存しています。より柔軟な正規表現を使用して、Markdownの構造（見出しレベル、リストアイテム）に基づいてパースするように変更します。

**例 (ブロッカー抽出):**
```typescript
private extractBlockers(content: string): Blocker[] {
  const blockerSection = content.split('## Blockers')[1];
  if (!blockerSection) return [];

  const blockerRegex = /- \[ \] (TASK-\d+): (.+)/g;
  // ...
}
```

### 5. ユニットテスト

- `src/server/src/services/progressParser.test.ts` を作成します。
- `fs.readFileSync` をモックし、様々なパターンの `progress.md` のダミーコンテンツをインプットとしてテストケースを作成します。
  - 正常系（全情報あり）
  - ブロッカーなし
  - トラック1つのみ
  - タスクなし
  - 不正なフォーマット

## 検証方法

- `npm test` を `src/server` ディレクトリで実行し、すべてのテストがパスすること。
- 実際の `progress.md` を使って手動で実行し、期待通りのJSONが出力されることを確認する。
