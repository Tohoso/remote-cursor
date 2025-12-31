# TASK-014: 新規ダッシュボードコンポーネントの実装 (EPIC-05)

## 概要

ダッシュボード画面を構成する新しい主要コンポーネントを実装します。このタスクは、プレースホルダーとして作成されたコンポーネントに、実際のデータとロジックを組み込むことに焦点を当てます。

## 参照ドキュメント

- [実装計画書](../docs/implementation/IMPLEMENTATION_PLAN.md)
- [UI/UXワイヤーフレーム仕様書](../docs/implementation/WIREFRAME_SPEC.md)
- [TASK-013: ダッシュボード画面の再構築](./TASK-013-EPIC-04-DASHBOARD-REBUILD.md)

## 完了条件

1.  `ProgressSummaryCard.tsx` を実装する。
2.  `TrackCard.tsx` を実装する。
3.  `BlockerAlert.tsx` を実装する。
4.  各コンポーネントは、Propsとして渡されたデータを正しく表示する。
5.  UIがワイヤーフレーム (`01_dashboard_main.png`) と一致すること。

## 実装詳細

### 1. `ProgressSummaryCard.tsx`

- **Props**: `completed: number`, `total: number`
- **ロジック**:
  - `progress = (completed / total) * 100` を計算する。
  - 円形プログレスチャートを実装する（`react-native-circular-progress` などのライブラリ利用を推奨）。
  - 完了、進行中、未着手のタスク数を表示する（この時点ではダミーデータで可）。

### 2. `TrackCard.tsx`

- **Props**: `track: Track` (`@common/types`)
- **ロジック**:
  - トラック名、担当エージェント、進捗バーを表示する。
  - トラック内のタスクリストを最大3件までプレビュー表示する。
  - 各タスクアイテムにはステータスアイコン（✅🟡⚪）、タスクID、タイトルを表示する。
  - タップすると `TrackDetailScreen` に遷移するナビゲーションを実装する。

```tsx
// src/mobile/components/dashboard/TrackCard.tsx
import { useNavigation } from '@react-navigation/native';
// ...

const navigation = useNavigation();

return (
  <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { trackId: track.id })}>
    {/* ... */}
  </TouchableOpacity>
);
```

### 3. `BlockerAlert.tsx`

- **Props**: `count: number`
- **ロジック**:
  - アクティブなブロッカーの数を表示する。
  - タップすると `BlockerDetailScreen` に遷移するナビゲーションを実装する。

### 4. スタイリング

- NativeWind (`className`) を使用して、ワイヤーフレームで定義されたカラースキームとレイアウトを適用します。
- ステータスカラーは `@common/constants.ts` のようなファイルで一元管理することを推奨します。

## 検証方法

- Storybookまたは同等のコンポーネントテスト環境で、各コンポーネントが異なるPropsに対して正しく表示されることを確認する。
- ダッシュボード画面に統合された状態で、全体のレイアウトが崩れないことを確認する。
- `TrackCard` と `BlockerAlert` をタップした際に、それぞれ対応する画面（この時点では空の画面でOK）に遷移すること。
