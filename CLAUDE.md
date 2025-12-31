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

## Parallel Development with Git Worktree

This project uses **parallel development** with multiple Claude Code instances. To prevent branch conflicts, we use **Git Worktree** to create separate working directories.

### Environment Setup

| Working Directory | Agent | Track | Branch Prefix |
|-------------------|-------|-------|---------------|
| `~/remote-cursor/` | Claude-1 | Mobile App | `feature/mobile/` |
| `~/remote-cursor-server/` | Claude-2 | PC Server | `feature/server/` |

**CRITICAL**: Each agent MUST work in its designated directory. See `GIT_WORKTREE_SETUP.md` for setup instructions.

### How to Identify Your Role

Check your current working directory:

```bash
pwd
```

- If you are in `remote-cursor/` → You are **Claude-1** (Mobile App)
- If you are in `remote-cursor-server/` → You are **Claude-2** (PC Server)

### Directory Ownership

| Agent | Allowed to Modify | NOT Allowed to Modify |
|-------|-------------------|----------------------|
| Claude-1 | `src/mobile/`, `progress.md` (Mobile section) | `src/server/` |
| Claude-2 | `src/server/`, `progress.md` (Server section) | `src/mobile/` |

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
