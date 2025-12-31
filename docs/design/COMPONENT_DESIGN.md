# Remote Cursor - Component Design Specification

**バージョン**: 1.0  
**作成日**: 2025年1月1日  
**作成者**: Manus AI

---

## 1. 概要

本ドキュメントは、Remote CursorモバイルアプリケーションのUIコンポーネントの階層、責務、インターフェース（Props）、および設計指針を定義します。Atomic Designの原則を参考に、再利用可能でメンテナンス性の高いコンポーネント群を構築することを目的とします。

## 2. 設計思想

- **Atomic Design**: コンポーネントを `Atoms` -> `Molecules` -> `Organisms` の粒度で分類し、これらを組み合わせて `Templates` (画面) を構築します。
- **Presentational and Container Components**: UIの見た目のみ責務を持つPresentationalコンポーネントと、ロジックや状態管理に責務を持つContainerコンポーネントを分離します。
- **Props Driven**: コンポーネントは主にPropsを通じてデータを受け取り、自身の状態管理は最小限に留めます。状態の多くはZustandストアで一元管理します。

## 3. ディレクトリ構造

コンポーネントは機能ドメインごとに分類して配置します。

```
src/mobile/components/
├── common/         # アプリ全体で再利用する基本的なコンポーネント (Atoms)
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ...
├── dashboard/      # ダッシュボード画面に関連するコンポーネント (Molecules, Organisms)
│   ├── ProgressSummaryCard.tsx
│   ├── TrackCard.tsx
│   └── BlockerAlert.tsx
├── track/          # トラック詳細画面に関連するコンポーネント
│   ├── TrackInfoCard.tsx
│   └── TaskTimeline.tsx
├── blocker/        # ブロッカー詳細画面に関連するコンポーネント
│   ├── BlockerCard.tsx
│   └── ResolveBlockerForm.tsx
└── activity/       # アクティビティログ画面に関連するコンポーネント
    ├── FilterChips.tsx
    └── LogEntry.tsx
```

## 4. コンポーネントツリー

```
- App
  - Navigation (StackNavigator)
    - MainTabs (BottomTabNavigator)
      - DashboardScreen (Template)
        - Header (Molecule)
        - ProgressSummaryCard (Organism)
        - BlockerAlert (Molecule)
        - TrackCard (Organism)
          - ProgressBar (Atom)
          - TaskPreviewItem (Molecule)
      - ActivityLogScreen (Template)
        - FilterChips (Molecule)
        - LogEntry (Molecule)
    - TrackDetailScreen (Template)
      - TrackInfoCard (Organism)
      - TaskTimeline (Organism)
        - TaskTimelineItem (Molecule)
    - BlockerDetailScreen (Template)
      - BlockerCard (Organism)
      - ResolveBlockerForm (Organism)
```

## 5. コンポーネント詳細仕様

### 5.1. Atoms (共通コンポーネント)

| コンポーネント | 責務 | 主なProps |
|:---|:---|:---|
| `Button` | 標準的なボタン | `title`, `onPress`, `variant` |
| `Card` | コンテンツを囲むカードUI | `children` |
| `ProgressBar` | 進捗バー | `progress: number` |
| `StatusIcon` | ステータスに応じたアイコン表示 | `status: TaskStatus` |

### 5.2. Dashboardコンポーネント

#### `ProgressSummaryCard` (Organism)
- **責務**: プロジェクト全体の進捗サマリーを円形チャートと数値で表示する。
- **Props**:
  - `completed: number`
  - `total: number`
- **状態**: なし
- **依存**: `react-native-circular-progress`

#### `TrackCard` (Organism)
- **責務**: 単一トラックのサマリー情報を表示し、詳細画面へのナビゲーションを提供する。
- **Props**:
  - `track: Track`
- **状態**: なし
- **依存**: `ProgressBar`, `TaskPreviewItem`, `useNavigation`

#### `BlockerAlert` (Molecule)
- **責務**: アクティブなブロッカーの存在をユーザーに警告し、詳細画面へのナビゲーションを提供する。
- **Props**:
  - `count: number`
- **状態**: なし
- **依存**: `useNavigation`

### 5.3. Track Detailコンポーネント

#### `TrackInfoCard` (Organism)
- **責務**: トラック詳細画面のヘッダーとして、トラックのメタ情報を表示する。
- **Props**:
  - `track: Track`
- **状態**: なし

#### `TaskTimeline` (Organism)
- **責務**: トラックに属するタスクを時系列のタイムラインとして表示する。
- **Props**:
  - `tasks: Task[]`
- **状態**: なし
- **依存**: `TaskTimelineItem`

### 5.4. Blocker Detailコンポーネント

#### `BlockerCard` (Organism)
- **責務**: ブロッカーの詳細情報を表示する。
- **Props**:
  - `blocker: Blocker`
- **状態**: なし

#### `ResolveBlockerForm` (Organism)
- **責務**: ブロッカー解決のための指示をユーザーが入力し、サーバーに送信するフォーム。
- **Props**:
  - `blockerId: string`
- **状態**: `instruction: string` (入力テキスト)
- **依存**: `useWebSocket`

### 5.5. Activity Logコンポーネント

#### `FilterChips` (Molecule)
- **責務**: ログエントリをソース（エージェント）でフィルタリングするためのUI。
- **Props**:
  - `sources: string[]`
  - `activeFilter: string`
  - `onFilterChange: (source: string) => void`
- **状態**: なし

#### `LogEntry` (Molecule) - 拡張
- **責務**: 単一のログエントリを表示する。
- **Props**:
  - `log: ActivityLogEntry`
- **変更点**: `source` に応じてエージェントアイコンを表示するロジックを追加。

## 6. スタイリングガイドライン

- **フレームワーク**: NativeWind (`className`) を全面的に採用する。
- **カラーパレット**: `docs/implementation/WIREFRAME_SPEC.md` で定義されたカラーパレットを使用する。色は定数として `src/common/constants.ts` で一元管理する。
- **レスポンシブ**: 現時点ではモバイル画面に最適化するが、将来的なタブレット対応を考慮し、ハードコーディングされた幅や高さは避ける。

## 7. アクセシビリティ (A11y)

- すべてのインタラクティブ要素（ボタン、カード）には `accessibilityLabel` を設定する。
- テキストと背景のコントラスト比はWCAG AA基準を満たすようにする。
- `StatusIndicator` など、色のみで情報を伝えている箇所には、テキストによる代替情報も提供する。
