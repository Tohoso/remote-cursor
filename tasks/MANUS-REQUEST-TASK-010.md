# Manus Request - TASK-010: 共有データモデルの定義

**Timestamp**: 2025-01-01T15:00:00+09:00
**Priority**: High
**Track**: common
**Owner**: Claude Code

---

## 指示

Sprint 2の最初のタスクとして、**TASK-010: 共有データモデルの定義**を実行してください。

### 実行手順

1. `git checkout develop && git pull origin develop` で最新を取得
2. `tasks/TASK-010-EPIC-01-SHARED-TYPES.md` を読んで要件を確認
3. `docs/design/DATA_MODEL.md` を参照して型の詳細仕様を確認
4. `git checkout -b feature/common/task-010-shared-types` でブランチを作成
5. `src/common/types.ts` を実装（雛形は既に存在）
6. tsconfig.jsonのパス設定を更新
7. `tsc --noEmit` でコンパイルエラーがないことを確認
8. `progress.md` のTASK-010のステータスを `🟡 In Progress` → `✅ Done` に更新
9. コミット＆プッシュ
10. PRを自動作成

### 参照ドキュメント

| ドキュメント | パス |
|:---|:---|
| タスクファイル | `tasks/TASK-010-EPIC-01-SHARED-TYPES.md` |
| データモデル設計書 | `docs/design/DATA_MODEL.md` |
| 実装計画書 | `docs/implementation/IMPLEMENTATION_PLAN.md` |
| CLAUDE.md | `CLAUDE.md` (Sprint 2セクション) |

### 完了条件

- [ ] `src/common/types.ts` に全ての型定義が実装されている
- [ ] `@common/*` エイリアスがサーバー・モバイル両方で使用可能
- [ ] `tsc --noEmit` がエラーなしで通る
- [ ] PRが作成されている

### 注意事項

- このタスクは他のすべてのSprint 2タスクの依存元です
- 型定義は `docs/design/DATA_MODEL.md` の仕様に厳密に従ってください
- 既存の `src/common/types.ts` には雛形とTODOコメントがあります

---

## Status

- [ ] Reviewed by Claude Code
- [ ] Implementation started
- [ ] Implementation complete
- [ ] PR created
- [ ] Merged to develop
