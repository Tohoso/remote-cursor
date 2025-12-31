# TASK-016: トラック詳細画面の実装 (EPIC-07)

## 概要

特定の開発トラックに属するタスクの詳細な進捗状況とタイムラインを表示する `TrackDetailScreen` を実装します。

## 完了条件

1. `TrackDetailScreen.tsx` を作成する。
2. `TrackInfoCard.tsx`, `TaskTimeline.tsx`, `TaskTimelineItem.tsx` コンポーネントを作成する。
3. Zustandストアから選択されたトラックの情報を取得し、表示する。
4. UIがワイヤーフレーム (`02_track_detail.png`) と一致すること。

---

# TASK-017: ブロッカー詳細画面の実装 (EPIC-08)

## 概要

アクティブなブロッカーの詳細情報を表示し、ユーザーが解決のための指示を送信できる `BlockerDetailScreen` を実装します。

## 完了条件

1. `BlockerDetailScreen.tsx` を作成する。
2. `BlockerCard.tsx`, `ResolveBlockerForm.tsx` コンポーネントを作成する。
3. 指示送信フォームを実装し、WebSocket経由でサーバーに送信する。
4. UIがワイヤーフレーム (`03_blocker_detail.png`) と一致すること。

---

# TASK-018: アクティビティログ画面の実装 (EPIC-09)

## 概要

プロジェクト全体のリアルタイムなイベントストリームを表示する `ActivityLogScreen` を実装します。

## 完了条件

1. `ActivityLogScreen.tsx` を作成する。
2. `FilterChips.tsx` コンポーネントを作成し、ログのフィルタリング機能を実装する。
3. `LogEntry.tsx` を拡張し、エージェントアイコンやステータスアイコンを表示できるようにする。
4. 仮想スクロールを実装し、大量のログでもパフォーマンスが低下しないようにする。
5. UIがワイヤーフレーム (`04_realtime_log.png`) と一致すること。

---

# TASK-019: WebSocket通信の強化 (EPIC-10)

## 概要

サーバーとクライアント間のWebSocket通信を強化し、より詳細なリアルタイム更新を実現します。

## 完了条件

1. **サーバー**: `task_update`, `blocker_alert`, `log_entry` イベントを送信するロジックを追加する。
2. **クライアント**: 上記のイベントを受信し、Zustandストアを更新するハンドラを `useWebSocket` フックに追加する。

---

# TASK-020: プッシュ通知の実装 (EPIC-11)

## 概要

Expo Push Notificationsを導入し、重要なイベント（特にブロッカー発生時）をユーザーに通知する機能を実装します。

## 完了条件

1. Expo Push Notificationsのセットアップを行う。
2. ユーザーからプッシュ通知の許可を取得するフローを実装する。
3. **サーバー**: ブロッカーが発生した際に、プッシュ通知送信APIを呼び出すロジックを追加する。

---

# TASK-021: ドキュメントとクリーンアップ (EPIC-12)

## 概要

プロジェクトの最終仕上げとして、ドキュメントの更新と不要なコードの削除を行います。

## 完了条件

1. `README.md` を更新し、新しいUIと機能について記述する。
2. Storybookまたはスタイルガイドを更新する。
3. 古いコンポーネント (`ProjectCard` など) やストアのロジックを削除する。
4. コード全体のリンティングとフォーマットを実行する。
