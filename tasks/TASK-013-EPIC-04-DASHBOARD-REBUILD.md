# TASK-013: ダッシュボード画面の再構築 (EPIC-04)

## 概要

アプリケーションのメイン画面であるダッシュボード (`DashboardScreen.tsx`) をリファクタリングし、ワイヤーフレームで定義された新しいコンポーネントレイアウトを実装します。

## 参照ドキュメント

- [実装計画書](../docs/implementation/IMPLEMENTATION_PLAN.md)
- [UI/UXワイヤーフレーム仕様書](../docs/implementation/WIREFRAME_SPEC.md)
- [TASK-012: モバイルアプリ状態管理の刷新](./TASK-012-EPIC-03-STATE-MANAGEMENT.md)

## 完了条件

1.  `src/mobile/app/screens/DashboardScreen.tsx` をリファクタリングする。
2.  新しいレイアウトに従い、`ProgressSummaryCard`, `TrackCard`, `BlockerAlert` コンポーネントを配置する。
3.  Zustandストアから新しいデータ構造 (`tracks`, `blockers`) を取得し、各コンポーネントにPropsとして渡す。
4.  既存の `ProjectCard` と `LogEntry` の埋め込みを削除する（これらは新しいコンポーネントまたは画面に置き換えられる）。
5.  UIがワイヤーフレーム (`01_dashboard_main.png`) と一致すること。

## 実装詳細

### 1. `DashboardScreen.tsx` のリファクタリング

- 既存の `useEffect` 内のロジックを `useDashboardStore` の `actions` を呼び出すように簡素化します。
- `socket.on('project_status', ...)` のハンドラは、受け取った `ProjectStatus` オブジェクトをそのまま `setProjectStatus` アクションに渡すだけにします。
- JSX部分を全面的に書き換え、新しいコンポーネント構造を反映させます。

```tsx
// src/mobile/app/screens/DashboardScreen.tsx

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDashboardStore } from '../../stores/dashboardStore';

// Import new components
import { Header } from '../../components/dashboard/Header';
import { ProgressSummaryCard } from '../../components/dashboard/ProgressSummaryCard';
import { TrackCard } from '../../components/dashboard/TrackCard';
import { BlockerAlert } from '../../components/dashboard/BlockerAlert';

export const DashboardScreen = () => {
  const { projectStatus, connectionStatus } = useDashboardStore();

  if (!projectStatus) {
    return <Text>Loading...</Text>; // Or a proper loading state
  }

  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView className="flex-1 px-4 pt-4">
        <Header 
          connectionStatus={connectionStatus} 
          lastUpdated={projectStatus.lastUpdated} 
        />
        
        <ProgressSummaryCard 
          completed={projectStatus.completedTasks} 
          total={projectStatus.totalTasks} 
        />

        {projectStatus.blockers.length > 0 && (
          <BlockerAlert count={projectStatus.blockers.length} />
        )}

        <View className="mt-6">
          <Text className="text-white text-lg font-semibold mb-3">Tracks</Text>
          {projectStatus.tracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </View>

      </ScrollView>
    </View>
  );
};
```

### 2. `Header` コンポーネントの作成

- `DashboardScreen` からヘッダー部分を分離し、`src/mobile/components/dashboard/Header.tsx` を作成します。
- `connectionStatus` と `lastUpdated` をPropsとして受け取ります。

### 3. プレースホルダーコンポーネント

- このタスクの時点では、`ProgressSummaryCard`, `TrackCard`, `BlockerAlert` はダミーデータを表示するプレースホルダーとして作成しても構いません。これらのコンポーネントの完全な実装は `TASK-014` で行います。

## 検証方法

- モバイルアプリを起動し、ダッシュボード画面がクラッシュせずに表示されること。
- 新しいコンポーネント（`Header`, `ProgressSummaryCard`, `TrackCard`, `BlockerAlert`）がワイヤーフレーム通りのレイアウトで配置されていること。
- `projectStatus` がnullの場合にローディング表示が出ること。
- `blockers` が空の場合に `BlockerAlert` が表示されない。
