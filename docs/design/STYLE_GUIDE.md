# Remote Cursor - スタイルガイド

**Version**: 2.0
**Last Updated**: 2025-01-01
**Default Language**: 日本語

このドキュメントは、Remote Cursorモバイルアプリケーションのビジュアルスタイルを定義し、一貫性のある高品質なユーザー体験を保証します。

---

## 1. カラーパレット

長時間のモニタリングでも目に優しいダークテーマを採用しています。

### 1.1. プライマリカラー

| カラー | Hex | 用途 |
|:---|:---|:---|
| **Background** | `#111827` | メインアプリ背景 |
| **Surface** | `#1F2937` | カード背景、入力フィールド |
| **Primary Text** | `#F9FAFB` | 見出し、重要なテキスト |
| **Secondary Text** | `#9CA3AF` | 本文、ラベル、説明文 |
| **Accent** | `#3B82F6` | ボタン、リンク、アクティブインジケーター |

### 1.2. ステータスカラー

タスクやトラックのステータスを一目で把握できる色分けです。

| ステータス | カラー | Hex | 用途 |
|:---|:---|:---|:---|
| **Success** | グリーン | `#10B981` | 完了タスク、成功操作 |
| **In Progress** | イエロー | `#F59E0B` | 進行中タスク、警告 |
| **Blocked** | レッド | `#EF4444` | ブロックされたタスク、エラー |
| **Ready** | グレー | `#6B7280` | 開始待ちタスク |

### 1.3. カラースウォッチ

![Color Palette](components/color_palette.png)

---

## 2. タイポグラフィ

エヴァンゲリオン的なカッコよさと視認性を両立するため、以下のフォント構成を採用します。

### 2.1. フォントファミリー

| 用途 | フォント | 特徴 |
|:---|:---|:---|
| **見出し・タイトル** | Zen Old Mincho | エヴァ風の重厚感、オールドスタイル明朝体 |
| **本文・UI** | Noto Sans JP | 視認性・可読性が最高、汎用的 |
| **数字・コード** | JetBrains Mono | 等幅、プログラマー向け |

### 2.2. フォントインストール（Expo）

```bash
npx expo install @expo-google-fonts/zen-old-mincho @expo-google-fonts/noto-sans-jp expo-font
```

### 2.3. フォントスケール

| スタイル | フォント | サイズ | ウェイト | 用途 |
|:---|:---|:---|:---|:---|
| **Display** | Zen Old Mincho | 36px | 700 (Bold) | 大きなヒーロータイトル |
| **Heading 1** | Zen Old Mincho | 24px | 700 (Bold) | 画面タイトル |
| **Heading 2** | Zen Old Mincho | 20px | 600 (SemiBold) | カードタイトル、セクションヘッダー |
| **Body** | Noto Sans JP | 16px | 400 (Regular) | メインコンテンツ、説明文 |
| **Label** | Noto Sans JP | 14px | 500 (Medium) | フィールドラベル、メタデータ |
| **Caption** | Noto Sans JP | 12px | 400 (Regular) | タイムスタンプ、小さな注釈 |
| **Mono** | JetBrains Mono | 14px | 400 (Regular) | タスクID、コード、ログ |

### 2.4. フォント使用例

```
┌─────────────────────────────────────┐
│  Remote Cursor        [Zen Old Mincho, 24px, Bold]
│  ─────────────────────────────────
│  
│  全体進捗              [Zen Old Mincho, 20px, SemiBold]
│  
│  89%                   [Noto Sans JP, 36px, Bold]
│  
│  Mobile App トラック   [Zen Old Mincho, 16px, Medium]
│  Claude-1 が担当       [Noto Sans JP, 14px, Regular]
│  
│  TASK-010              [JetBrains Mono, 14px, Regular]
│  14:32:05              [JetBrains Mono, 12px, Regular]
└─────────────────────────────────────┘
```

---

## 3. スペーシング & レイアウト

4pxグリッドシステムを使用し、一貫したスペーシングと配置を実現します。

| 単位 | サイズ | 用途 |
|:---|:---|:---|
| **1 unit** | 4px | 小さなギャップ、アイコンパディング |
| **2 units** | 8px | テキスト要素間のギャップ |
| **3 units** | 12px | 小さなコンポーネント内のパディング |
| **4 units** | 16px | 標準パディング、カード間のギャップ |
| **6 units** | 24px | ページマージン、大きなセクションギャップ |

---

## 4. コンポーネント

### 4.1. ボタン

| タイプ | 背景 | テキスト | ボーダー | 角丸 |
|:---|:---|:---|:---|:---|
| **Primary** | `#3B82F6` | `#F9FAFB` | なし | 8px |
| **Secondary** | `#1F2937` | `#F9FAFB` | 1px `#3B82F6` | 8px |
| **Danger** | `#EF4444` | `#F9FAFB` | なし | 8px |

### 4.2. カード

| プロパティ | 値 |
|:---|:---|
| **背景** | `#1F2937` |
| **パディング** | 16px |
| **角丸** | 12px |
| **シャドウ** | `shadow-lg` (Tailwind) |

### 4.3. アイコン

| プロパティ | 値 |
|:---|:---|
| **アイコンセット** | Heroicons (https://heroicons.com/) |
| **プライマリサイズ** | 24x24px |
| **インラインサイズ** | 20x20px |
| **デフォルトカラー** | `#9CA3AF` (Secondary Text) |
| **アクティブカラー** | `#3B82F6` (Accent) |

---

## 5. テーマファイル

`src/mobile/theme.ts` にこれらの値が定数としてエクスポートされています。

```typescript
import { colors, typography, spacing, fontFamilies } from './theme';

// 使用例
<Text style={{ 
  fontFamily: fontFamilies.heading, 
  ...typography.h1 
}}>
  Remote Cursor
</Text>
```

---

## 6. 画面モックアップ

以下の高精細モックアップを実装の視覚的リファレンスとして使用してください。

### 6.1. ダッシュボード画面

プロジェクト全体の進捗、トラックカード、ブロッカーアラートを表示するメイン画面。

![Dashboard Mockup](components/dashboard_mockup.png)

**主要要素:**
- 中央にパーセンテージを表示する円形プログレスインジケーター
- 水平プログレスバー付きトラックカード
- 画面下部の赤いブロッカーアラートバナー

### 6.2. トラック詳細画面

特定トラックの詳細なタスクタイムラインを表示。

![Track Detail Mockup](components/track_detail_mockup.png)

**主要要素:**
- 色付きドットを持つ垂直タイムライン
- ステータスバッジ付きタスクカード
- 完了タスクのPRリンク
- 進行中タスクのパルスインジケーター

### 6.3. ブロッカー詳細画面

ブロッカーの詳細表示と指示送信機能。

![Blocker Detail Mockup](components/blocker_detail_mockup.png)

**主要要素:**
- 赤いボーダーのアラートカード
- クリック可能な影響タスクリンク
- クイックレスポンスチップ
- カスタム指示用テキスト入力

### 6.4. アクティビティログ画面

フィルタリング機能付きのリアルタイムイベントストリーム。

![Activity Log Mockup](components/activity_log_mockup.png)

**主要要素:**
- 水平フィルターチップ
- 等幅フォントのタイムスタンプ
- ログレベル別の色付きドット
- ソースバッジ（Claude-1, Claude-2, Server）

---

## 7. 実装チェックリスト

Claude Codeは実装時に以下を確認してください：

- [ ] フォントが正しくロードされている（Zen Old Mincho, Noto Sans JP, JetBrains Mono）
- [ ] 見出しにZen Old Minchoが使用されている
- [ ] 本文にNoto Sans JPが使用されている
- [ ] タスクID、タイムスタンプにJetBrains Monoが使用されている
- [ ] カラーがスタイルガイドと一致している
- [ ] スペーシングが4pxグリッドに従っている
- [ ] モックアップと視覚的に一致している
