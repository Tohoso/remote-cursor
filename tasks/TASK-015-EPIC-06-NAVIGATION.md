# TASK-015: ナビゲーションのセットアップ (EPIC-06)

## 概要

React Navigationをセットアップし、新規画面（TrackDetail, BlockerDetail, ActivityLog）へのナビゲーションを実装します。型安全なナビゲーションを実現するための型定義も行います。

## 参照ドキュメント

- [実装計画書](../docs/implementation/IMPLEMENTATION_PLAN.md)

## 完了条件

1.  `BottomTabNavigator.tsx` に `StackNavigator` を追加する。
2.  `TrackDetailScreen`, `BlockerDetailScreen`, `ActivityLogScreen` をナビゲーションスタックに追加する。
3.  ナビゲーション用の型定義ファイル (`src/mobile/navigation/types.ts`) を作成・更新する。
4.  ダッシュボード画面から各詳細画面へ遷移できることを確認する。

## 実装詳細

### 1. ナビゲーション構造の変更

- 現在の `BottomTabNavigator` を `StackNavigator` の一部としてネストします。

```
StackNavigator
  ├─ MainTabs (BottomTabNavigator)
  │   ├─ DashboardScreen
  │   ├─ TasksScreen
  │   └─ ...
  ├─ TrackDetailScreen
  ├─ BlockerDetailScreen
  └─ ActivityLogScreen
```

### 2. `navigation/types.ts` の作成

- 各画面で受け取るパラメータの型を定義します。

```typescript
// src/mobile/navigation/types.ts

export type RootStackParamList = {
  MainTabs: undefined;
  TrackDetail: { trackId: string };
  BlockerDetail: { blockerId: string };
  ActivityLog: undefined;
};

// useNavigationフックのための型定義
// ...
```

### 3. ナビゲーターの更新

- `App.tsx` またはナビゲーションのエントリーポイントとなるファイルで、`createStackNavigator` を使用して新しいナビゲーションスタックを定義します。

## 検証方法

- アプリを起動し、ボトムタブナビゲーションが正常に機能すること。
- `TASK-014` で実装した `TrackCard` や `BlockerAlert` をタップした際に、それぞれ対応する空の画面に遷移すること。
