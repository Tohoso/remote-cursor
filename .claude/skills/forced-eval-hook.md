# Forced Eval Hook

## Description

This skill ensures that all relevant skills and agents are evaluated before starting any task. It acts as a pre-flight check to maximize the effectiveness of the agent system.

## Trigger

ALWAYS evaluate this skill at the START of every task, before any other action.

## Evaluation Checklist

Before starting work, MUST complete the following:

| Step | Action | Required |
|------|--------|----------|
| 1 | Read `CLAUDE.md` for project context | Yes |
| 2 | Check `progress.md` for current status | Yes |
| 3 | Review current task file in `tasks/` | Yes |
| 4 | Identify which subagents may be needed | Yes |
| 5 | Check for any blockers or dependencies | Yes |

## Post-Evaluation Actions

After evaluation, announce:
1. Current task being worked on
2. Planned approach
3. Which subagents will be delegated to (if any)

## Example Output

```
📋 Task Evaluation Complete

Current Task: TASK-001 - Initialize Expo project
Status: Starting
Approach: Will use maker-agent for implementation
Dependencies: None
Blockers: None

Proceeding with task...
```

## Important

This skill ensures consistent behavior and prevents skipping important context. NEVER skip this evaluation step.
