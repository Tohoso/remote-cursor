# Remote Cursor - Style Guide

**Version**: 1.0
**Last Updated**: 2025-01-01

This document defines the visual style for the Remote Cursor mobile application, ensuring a consistent and high-quality user experience.

---

## 1. Color Palette

We use a dark theme to reduce eye strain during long monitoring sessions. Colors are chosen for clarity and accessibility.

### 1.1. Primary Colors

| Color | Hex | Usage |
|:---|:---|:---|
| **Background** | `#111827` | Main app background |
| **Surface** | `#1F2937` | Card backgrounds, input fields |
| **Primary Text** | `#F9FAFB` | Headings, important text |
| **Secondary Text** | `#9CA3AF` | Body text, labels, descriptions |
| **Accent** | `#3B82F6` | Buttons, links, active indicators |

### 1.2. Status Colors

These colors provide at-a-glance information about the status of tasks and tracks.

| Status | Color | Hex | Usage |
|:---|:---|:---|:---|
| **Success** | Green | `#10B981` | Completed tasks, successful operations |
| **In Progress** | Yellow | `#F59E0B` | Tasks in progress, warnings |
| **Blocked** | Red | `#EF4444` | Blocked tasks, errors |
| **Ready** | Gray | `#6B7280` | Tasks ready to start |

### 1.3. Color Swatches

![Color Palette](components/color_palette.png)

---

## 2. Typography

We use a single, highly readable font family for all text to maintain a clean and consistent look.

- **Font Family**: Inter (sans-serif)

### 2.1. Font Scale

| Style | Font Size | Font Weight | Usage |
|:---|:---|:---|:---|
| **Display** | 36px | 700 (Bold) | Large hero titles (rarely used) |
| **Heading 1** | 24px | 700 (Bold) | Screen titles |
| **Heading 2** | 20px | 600 (SemiBold) | Card titles, section headers |
| **Body** | 16px | 400 (Regular) | Main content, descriptions |
| **Label** | 14px | 500 (Medium) | Field labels, metadata |
| **Caption** | 12px | 400 (Regular) | Timestamps, small print |

---

## 3. Spacing & Layout

We use a 4px grid system for consistent spacing and alignment. All margins, paddings, and layout dimensions should be a multiple of 4.

| Unit | Size | Usage |
|:---|:---|:---|
| **1 unit** | 4px | Small gaps, icon padding |
| **2 units** | 8px | Gaps between text elements |
| **3 units** | 12px | Padding within small components |
| **4 units** | 16px | Standard padding, gaps between cards |
| **6 units** | 24px | Page margins, large section gaps |

---

## 4. Components

### 4.1. Buttons

- **Primary Button**: `Accent` background, `Primary Text` color, 12px padding, 8px border radius.
- **Secondary Button**: `Surface` background, `Primary Text` color, 1px `Accent` border.

### 4.2. Cards

- **Background**: `Surface` color
- **Padding**: 16px
- **Border Radius**: 12px
- **Shadow**: Subtle drop shadow for depth (e.g., `shadow-lg` in Tailwind)

### 4.3. Icons

- **Icon Set**: Heroicons (https://heroicons.com/)
- **Size**: 24x24px for primary icons, 20x20px for inline icons.
- **Color**: `Secondary Text` for default, `Accent` for active/highlighted.

---

## 5. Theme File

A `theme.ts` file will be created to export these values as constants for use in the React Native application.

```typescript
// src/mobile/theme.ts

export const colors = {
  background: '#111827',
  surface: '#1F2937',
  // ... all other colors
};

export const typography = {
  h1: { fontSize: 24, fontWeight: '700' },
  // ... all other styles
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};
```


---

## 6. Screen Mockups

The following high-fidelity mockups serve as the visual reference for implementation. Claude Code should match these designs as closely as possible.

### 6.1. Dashboard Screen

The main screen showing overall project progress, track cards, and blocker alerts.

![Dashboard Mockup](components/dashboard_mockup.png)

**Key Elements:**
- Circular progress indicator with percentage in center
- Track cards with horizontal progress bars
- Red blocker alert banner at bottom

### 6.2. Track Detail Screen

Shows detailed task timeline for a specific track.

![Track Detail Mockup](components/track_detail_mockup.png)

**Key Elements:**
- Vertical timeline with colored dots
- Task cards with status badges
- PR links for completed tasks
- Pulsing indicator for in-progress tasks

### 6.3. Blocker Detail Screen

Allows users to view blocker details and send instructions.

![Blocker Detail Mockup](components/blocker_detail_mockup.png)

**Key Elements:**
- Red-bordered alert card
- Impacted tasks as clickable links
- Quick response chips
- Text input for custom instructions

### 6.4. Activity Log Screen

Real-time stream of system events with filtering.

![Activity Log Mockup](components/activity_log_mockup.png)

**Key Elements:**
- Horizontal filter chips
- Timestamp in monospace font
- Colored dots for log levels
- Source badges (Claude-1, Claude-2, Server)
