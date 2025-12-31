# Remote Cursor - Claude Code Project Configuration

## Project Overview

**Remote Cursor** is a mobile application that enables developers to monitor and control their Cursor/VSCode development environment from a smartphone. The app provides real-time monitoring of AI agent activities, task management, and remote development capabilities.

## Architecture

This project follows a **hybrid architecture** combining:
- **React Native (Expo)** for the mobile app
- **Node.js** for the PC Agent Server
- **code-server** for Web IDE functionality
- **WebRTC** for on-demand screen sharing
- **Tailscale** for secure P2P networking

See `docs/design/architecture_design.md` for detailed architecture documentation.

## Directory Structure

```
remote-cursor/
├── CLAUDE.md                 # This file - project configuration
├── progress.md               # Current progress tracking (auto-updated)
├── .claude/
│   ├── agents/               # Subagent definitions
│   └── skills/               # Skill definitions
├── docs/
│   ├── requirements/         # Requirements documentation
│   ├── design/               # Architecture and design docs
│   └── mockups/              # UI mockups
├── tasks/                    # Task files for agent instructions
└── src/                      # Source code
    ├── mobile/               # React Native mobile app (Claude-1)
    └── server/               # PC Agent Server (Claude-2)
```

## Parallel Development with Git Worktree (Autonomous Management)

This project uses **parallel development** with multiple Claude Code instances. To prevent branch conflicts, we use **Git Worktree** to create separate working directories.

### AUTONOMOUS ENVIRONMENT SETUP (REQUIRED)

When you are assigned a task, you MUST **autonomously** verify and set up your working environment. **DO NOT ask the user for help or permission.** Follow the `autonomous-worktree-manager` skill.

**Step 1: Identify your assigned track** from the task file's `Track` and `Owner` fields.

**Step 2: Determine your required working directory:**

| Track | Required Directory | Branch Prefix |
|-------|-------------------|---------------|
| Mobile App | `../remote-cursor/` (main repo) | `feature/mobile/` |
| PC Server | `../remote-cursor-server/` | `feature/server/` |
| (New Track) | `../remote-cursor-{track-slug}/` | `feature/{track}/` |

**Step 3: Check if you are in the correct directory:**

```bash
pwd
```

**Step 4: If the required worktree does not exist, CREATE IT AUTONOMOUSLY:**

```bash
# Navigate to main repo (if needed)
cd $(git rev-parse --show-toplevel)

# Create worktree for your track (example: PC Server)
git worktree add ../remote-cursor-server develop
```

**Step 5: Inform the user** that you have created a new worktree and that your next execution should be in that directory.

### Scalable Track Management

This system supports **N parallel tracks**. To add a new track:

1. Create a new worktree: `git worktree add ../remote-cursor-{track-name} develop`
2. Add the track to the table above
3. Assign tasks with the new `Track` and `Owner` fields

### Directory Ownership

| Agent | Allowed to Modify | NOT Allowed to Modify |
|-------|-------------------|----------------------|
| Claude-1 | `src/mobile/`, `progress.md` (Mobile section) | `src/server/` |
| Claude-2 | `src/server/`, `progress.md` (Server section) | `src/mobile/` |
| Claude-N | `src/{track}/`, `progress.md` ({Track} section) | Other tracks |

## Development Workflow

This project uses the **Manus × Claude Code Collaboration Workflow**:

1. **Manus** acts as the orchestrator - handling research, planning, design, and review
2. **Claude Code** handles implementation - coding, testing, and debugging
3. Communication happens through `progress.md` and `tasks/` directory

### Task Execution Flow (MUST FOLLOW)

When you receive a task, follow this exact flow:

```
1. git checkout develop && git pull origin develop
2. Read the task file in tasks/TASK-XXX-*.md
3. Create feature branch: git checkout -b feature/{track}/task-XXX-description
4. Implement the task
5. Update progress.md (your track's section only)
6. Commit changes with descriptive message
7. Push branch: git push origin feature/{track}/task-XXX-description
8. **AUTOMATICALLY CREATE PR** (see below)
9. Notify user that PR is ready for review
```

### Automatic PR Creation (REQUIRED)

**After pushing your feature branch, you MUST automatically create a Pull Request.**

Use this command:

```bash
gh pr create --base develop --title "feat: {Task Title} (TASK-XXX)" --body "## Summary
{Brief description of changes}

## Changes Made
- {Change 1}
- {Change 2}

## Acceptance Criteria
- [ ] {Criterion 1}
- [ ] {Criterion 2}

## Related
- Completes TASK-XXX: {Task Title}
- Track: {Mobile App / PC Server}

🤖 Generated with Claude Code"
```

**DO NOT wait for user instruction to create PR. Create it immediately after pushing.**

### Task File Format

Tasks are created in `tasks/` directory with the following format:
- Filename: `TASK-{number}-{short-description}.md`
- Contains: Context, Requirements, Acceptance Criteria, Priority

### Progress Tracking

`progress.md` is the single source of truth for project status. Update it after completing each task phase.

## Coding Standards

### TypeScript
- Use strict mode
- Prefer functional components with hooks
- Use proper typing, avoid `any`

### React Native
- Follow Expo best practices
- Use TailwindCSS (NativeWind) for styling
- Implement proper error boundaries

### Node.js Server
- Use Express with TypeScript
- Implement proper error handling
- Use WebSocket for real-time communication

## Key Dependencies

### Mobile App
- expo
- react-native
- nativewind (TailwindCSS)
- @tanstack/react-query
- socket.io-client

### PC Server
- express
- ws (WebSocket)
- chokidar (file watching)
- typescript

## Testing Requirements

- Unit tests for all utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows

## Subagent Delegation Rules

When encountering the following situations, delegate to the appropriate subagent:

| Situation | Delegate To |
|-----------|-------------|
| Need architectural decisions or research | Manus (via manus-delegator skill) |
| Complex planning required | plan-agent |
| Code implementation | maker-agent |
| Test creation | test-agent |
| Security concerns | security-agent |
| PR/Code review | pr-agent |

## Important Notes

- Always check `progress.md` before starting work
- Update `progress.md` after completing each phase
- Create detailed commit messages
- **ALWAYS create PR automatically after pushing** - do not wait for instructions
- Ask for clarification rather than making assumptions
- Prioritize security, especially for network communication


---

## Sprint 2: UI/UX Overhaul

**Goal**: Implement the ideal UI/UX defined in wireframes for the progress.md monitoring feature.

### Required Reading Before Starting

Before starting any Sprint 2 task, you MUST read and understand the following documents:

| Document | Path | Purpose |
|:---|:---|:---|
| **Implementation Plan** | `docs/implementation/IMPLEMENTATION_PLAN.md` | Overall plan with 4 phases and 12 EPICs |
| **API Specification** | `docs/design/API_SPECIFICATION.md` | WebSocket events and REST endpoints |
| **Data Model** | `docs/design/DATA_MODEL.md` | Type definitions and validation rules |
| **Component Design** | `docs/design/COMPONENT_DESIGN.md` | UI component hierarchy and props |
| **State Management** | `docs/design/STATE_MANAGEMENT.md` | Zustand store design |
| **Test Plan** | `docs/testing/TEST_PLAN.md` | Test strategy and coverage goals |
| **Wireframe Spec** | `docs/implementation/WIREFRAME_SPEC.md` | Visual UI/UX specifications |

### Sprint 2 Task Execution Rules

1. **Read the task file first**: Each task is in `tasks/TASK-XXX-EPIC-YY-*.md`
2. **Check dependencies**: Do not start a task until its dependencies are marked `✅ Done` in `progress.md`
3. **Follow the design documents**: Implementation must match the specifications in the design documents
4. **Update progress.md**: After completing each task, update the status in `progress.md`
5. **Write tests**: Follow the Test Plan - aim for 80% code coverage

### Sprint 2 Directory Structure

```
src/
├── common/                    # Shared code between mobile and server
│   └── types.ts               # Shared type definitions (TASK-010)
├── mobile/
│   ├── app/
│   │   └── screens/           # Screen components (Templates)
│   ├── components/
│   │   ├── common/            # Atoms (Button, Card, etc.)
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── track/             # Track detail components
│   │   ├── blocker/           # Blocker detail components
│   │   └── activity/          # Activity log components
│   ├── stores/                # Zustand stores
│   └── hooks/                 # Custom hooks (useWebSocket, etc.)
└── server/
    └── src/
        └── services/          # progressParser, fileWatcher, etc.
```

### Sprint 2 Task Dependencies

```
TASK-010 (Shared Types)
    ├──► TASK-011 (Parser Enhancement) ──► TASK-019 (WebSocket Enhancement)
    └──► TASK-012 (State Management) ──► TASK-013 (Dashboard Rebuild)
                                              └──► TASK-014 (Dashboard Components)
                                                    └──► TASK-015 (Navigation)
                                                          ├──► TASK-016 (Track Detail)
                                                          ├──► TASK-017 (Blocker Detail)
                                                          └──► TASK-018 (Activity Log)
                                                                └──► TASK-021 (Documentation)
TASK-019 ──► TASK-020 (Push Notifications)
```

### progress.md Update Format

When updating `progress.md`, use the following status indicators:

| Status | Symbol | Meaning |
|:---|:---|:---|
| Not Started | `⚪ Ready` | Task is ready to be started |
| In Progress | `🟡 In Progress` | Task is currently being worked on |
| Completed | `✅ Done` | Task is completed and merged |
| Blocked | `⏳ Blocked` | Task is waiting for dependencies |

**Example update:**
```markdown
| TASK-010 | common | 共有データモデルの定義 | 🟡 In Progress | - |
```

After completing a task:
```markdown
| TASK-010 | common | 共有データモデルの定義 | ✅ Done | - |
```

### Starting Point for Sprint 2

**Start with TASK-010** (Shared Types). This task has no dependencies and provides the foundation for all other tasks.

1. Read `tasks/TASK-010-EPIC-01-SHARED-TYPES.md`
2. Read `docs/design/DATA_MODEL.md` for type specifications
3. Implement types in `src/common/types.ts`
4. Write unit tests
5. Update `progress.md`
6. Create PR


---

## UI/UX Design Guidelines

### デフォルト言語

このアプリケーションのデフォルト言語は**日本語**です。すべてのUIテキスト、ラベル、メッセージは日本語で実装してください。

### スタイルガイド

**必読**: `docs/design/STYLE_GUIDE.md`

このファイルには以下が定義されています：
- カラーパレット（ダークテーマ）
- タイポグラフィ（フォントファミリー、サイズ、ウェイト）
- スペーシングシステム（4pxグリッド）
- コンポーネントスタイル
- 画面モックアップ

### フォント構成

エヴァンゲリオン的なカッコよさと視認性を両立するため、以下のフォント構成を採用しています：

| 用途 | フォント | 特徴 |
|:---|:---|:---|
| **見出し・タイトル** | Zen Old Mincho | エヴァ風の重厚感、オールドスタイル明朝体 |
| **本文・UI** | Noto Sans JP | 視認性・可読性が最高、汎用的 |
| **数字・コード** | JetBrains Mono | 等幅、プログラマー向け |

### フォントインストール

Sprint 2のUI実装を開始する前に、以下のコマンドでフォントをインストールしてください：

```bash
cd src/mobile
npx expo install @expo-google-fonts/zen-old-mincho @expo-google-fonts/noto-sans-jp @expo-google-fonts/jetbrains-mono expo-font
```

### テーマファイル

`src/mobile/theme.ts` にすべてのデザイントークンが定義されています。コンポーネント実装時は必ずこのファイルからインポートして使用してください。

```typescript
import { colors, typography, spacing, fontFamilies } from '../theme';

// 使用例
const styles = StyleSheet.create({
  title: {
    ...typography.h1,
  },
  body: {
    ...typography.body,
  },
  taskId: {
    ...typography.mono,
  },
});
```

### フォントローダー

`src/mobile/utils/fonts.ts` にフォントローダーユーティリティが用意されています。App.tsxでフォントをロードする際に使用してください。

```typescript
import { useFonts } from 'expo-font';
import { customFonts } from './utils/fonts';

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <MainApp />;
}
```

### 実装チェックリスト

UI実装時は以下を確認してください：

- [ ] フォントが正しくロードされている
- [ ] 見出しに `Zen Old Mincho` が使用されている
- [ ] 本文に `Noto Sans JP` が使用されている
- [ ] タスクID、タイムスタンプに `JetBrains Mono` が使用されている
- [ ] カラーが `theme.ts` の値と一致している
- [ ] スペーシングが4pxグリッドに従っている
- [ ] モックアップ（`docs/design/components/*.png`）と視覚的に一致している
