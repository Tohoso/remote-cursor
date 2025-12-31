# TASK-002: Implement bottom navigation and screen routing

## 1. Context

TASK-001が完了し、Expoプロジェクトの基盤が整いました。次のステップとして、アプリの基本的なナビゲーション構造を実装します。

UIモックアップ（`docs/mockups/`）を参照すると、アプリには以下の4つの主要画面があります：

| 画面 | アイコン | モックアップ |
|------|----------|--------------|
| Dashboard | グリッドアイコン | `01_dashboard.png` |
| Terminal | ターミナルアイコン | `02_instruction_input.png` |
| Screen Share | 画面共有アイコン | `04_screen_share.png` |
| Settings | 歯車アイコン | `06_settings.png` |

## 2. Requirements

### 2.1 ディレクトリ構造の作成

`src/mobile/` 内に以下のディレクトリを作成してください：

```
src/mobile/
├── app/
│   └── screens/
│       ├── DashboardScreen.tsx
│       ├── TerminalScreen.tsx
│       ├── ScreenShareScreen.tsx
│       └── SettingsScreen.tsx
├── navigation/
│   └── BottomTabNavigator.tsx
└── components/
    └── (後のタスクで追加)
```

### 2.2 Bottom Tab Navigator の実装

`@react-navigation/bottom-tabs` を使用して、4つのタブを持つボトムナビゲーションを実装してください。

**スタイル要件**（モックアップ参照）：
- ダークテーマ（背景色: `#1a1a2e` または類似の暗い色）
- アクティブタブ: 青/紫のアクセントカラー（`#6c5ce7` など）
- 非アクティブタブ: グレー

### 2.3 各画面のプレースホルダー

各画面は現時点ではプレースホルダーとして、画面名を中央に表示するだけで構いません。

```tsx
// 例: DashboardScreen.tsx
export const DashboardScreen = () => {
  return (
    <View className="flex-1 bg-[#1a1a2e] items-center justify-center">
      <Text className="text-white text-xl">Dashboard</Text>
    </View>
  );
};
```

### 2.4 App.tsx の更新

`App.tsx` を更新して、`NavigationContainer` と `BottomTabNavigator` を使用するようにしてください。

## 3. Acceptance Criteria

- [ ] 4つのタブ（Dashboard, Terminal, Screen Share, Settings）が表示される
- [ ] 各タブをタップすると対応する画面に遷移する
- [ ] アクティブなタブが視覚的に区別される（色の変化）
- [ ] ダークテーマのスタイルが適用されている
- [ ] アプリが正常に起動し、ナビゲーションが機能する

## 4. Technical Notes

### 必要な追加パッケージ

TASK-001で `@react-navigation/native` はインストール済みですが、以下が追加で必要です：

```bash
npx expo install @react-navigation/bottom-tabs
npx expo install react-native-vector-icons
# または Expo Icons を使用
npx expo install @expo/vector-icons
```

### 参考リンク

- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/)

## 5. Priority

**High** - ナビゲーションは他のすべての画面実装の基盤となります。

## 6. Agent Delegation

このタスクは **maker-agent** が担当してください。
