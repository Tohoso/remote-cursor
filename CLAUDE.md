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
└── src/                      # Source code (to be created)
    ├── mobile/               # React Native mobile app
    └── server/               # PC Agent Server
```

## Development Workflow

This project uses the **Manus × Claude Code Collaboration Workflow**:

1. **Manus** acts as the orchestrator - handling research, planning, design, and review
2. **Claude Code** handles implementation - coding, testing, and debugging
3. Communication happens through `progress.md` and `tasks/` directory

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
- Ask for clarification rather than making assumptions
- Prioritize security, especially for network communication
