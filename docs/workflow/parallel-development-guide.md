# Parallel Development Guide

## Overview

This document outlines the parallel development workflow for the Remote Cursor project, utilizing multiple Claude Code instances managed by Manus.

## Core Principles

1.  **Task-based Parallelism**: Development is split into independent tracks, each handled by a dedicated Claude Code instance.
2.  **Manus as Orchestrator**: Manus manages task allocation, progress tracking, and conflict resolution.
3.  **Clear Ownership**: Each Claude Code instance has clear ownership of a specific part of the codebase to minimize conflicts.

## Development Tracks

We will start with two parallel development tracks:

### Track 1: Mobile App (Frontend)

-   **Owner**: `Claude-1`
-   **Directory**: `src/mobile/`
-   **Branch Prefix**: `feature/mobile/`
-   **Tasks**: UI implementation, navigation, state management, and component creation.

### Track 2: PC Agent Server (Backend)

-   **Owner**: `Claude-2`
-   **Directory**: `src/server/`
-   **Branch Prefix**: `feature/server/`
-   **Tasks**: API development, WebSocket implementation, file system watching, and business logic.

## Workflow for Claude Code Instances

1.  **Clone and Checkout**: Clone the repository and checkout the `develop` branch.
2.  **Receive Task**: Manus will assign a task (e.g., TASK-005) and specify the branch name (e.g., `feature/server/task-005-init-server`).
3.  **Create Branch**: Create the specified feature branch from `develop`.
4.  **Implement**: Implement the task within the assigned directory (`src/mobile` or `src/server`).
5.  **Update Progress**: After completion, update your track's progress in `progress.md`.
6.  **Commit and Push**: Commit your changes and push the feature branch.
7.  **Create Pull Request**: Create a PR to merge into the `develop` branch.
8.  **Await Review**: Wait for Manus to review and merge the PR.

## Progress Tracking in `progress.md`

The `progress.md` file will be updated to reflect the parallel tracks.

### New `Current Status` Format

```markdown
## Current Status

| Track | Owner | Task | Status |
|---|---|---|---|
| **Mobile App** | Claude-1 | TASK-002 | 🟡 In Progress |
| **PC Server** | Claude-2 | TASK-005 | ⚪ Not Started |
```

### New `Project Timeline` Format

```markdown
## Project Timeline

### Mobile App Timeline (Owner: Claude-1)
- [ ] TASK-002: ...
- [ ] TASK-003: ...

### PC Server Timeline (Owner: Claude-2)
- [ ] TASK-005: ...
- [ ] TASK-006: ...
```

## Conflict Resolution

-   **Code Conflicts**: Since directories are separated, code conflicts should be rare. If they occur, Manus will resolve them.
-   **`progress.md` Conflicts**: This is the most likely place for conflicts. **Rule**: Always `git pull origin develop` before editing `progress.md`. If a conflict still occurs, Manus will manually merge the changes from both tracks.

## Communication

-   All task assignments and reviews will be managed through GitHub issues, PRs, and `tasks/` directory.
-   If a Claude instance is blocked, it should create a `MANUS-REQUEST-*.md` file and notify the user, who will then inform Manus.
