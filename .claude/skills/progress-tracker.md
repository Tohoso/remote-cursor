# Progress Tracker Skill

## Description

This skill manages the `progress.md` file, ensuring accurate and up-to-date tracking of project progress.

## Trigger

MUST BE USED when:
- Starting a new task
- Completing a task or subtask
- Encountering a blocker
- Making a significant decision

## Update Format

When updating `progress.md`, modify the following sections as appropriate:

### Status Update
```markdown
| Item | Value |
|------|-------|
| **Phase** | [Current Phase] |
| **Status** | 🟢 Complete / 🟡 In Progress / 🔴 Blocked |
| **Current Task** | [Task ID and name] |
| **Active Agent** | [Agent name] |
| **Last Updated** | [Date] |
```

### Task Completion
Move completed tasks from the phase checklist:
```markdown
- [x] TASK-XXX: Description ✅
```

### Adding Blockers
```markdown
## Blockers & Issues

- **[Blocker ID]**: [Description]
  - Impact: [What is affected]
  - Needed: [What is needed to resolve]
```

### Decision Log Entry
```markdown
| Date | Decision | Rationale | Made By |
|------|----------|-----------|---------|
| [Date] | [Decision] | [Why] | [Agent/Manus] |
```

## Important

- Keep updates concise but informative
- Always include timestamps
- Link to relevant files or commits when applicable
- This file is the single source of truth for project status
