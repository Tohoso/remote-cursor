# Skill: Autonomous Worktree Manager

## Description

This skill enables you to autonomously manage Git Worktrees for parallel development. It ensures that each development track has its own isolated working directory, preventing branch conflicts.

## Trigger Conditions

This skill MUST be activated when:

1.  You are assigned a task on a new development track that does not yet have a dedicated worktree.
2.  You are instructed to set up the development environment for a new agent/track.
3.  You detect that you are in the wrong working directory for your assigned track.

## Core Logic

When assigned a task, you MUST first determine your role and required working directory based on the task's `Track` and `Owner` information.

1.  **Identify Your Role**: Read the task file (`tasks/TASK-XXX.md`) to find your assigned `Owner` (e.g., Claude-2) and `Track` (e.g., PC Server).

2.  **Determine Target Directory**: Based on your track, determine the correct working directory. The convention is `../{repo-name}-{track-name-slug}`.
    -   PC Server track → `../remote-cursor-server`
    -   Docs track → `../remote-cursor-docs`

3.  **Check Current Directory**: Execute `pwd` to check your current working directory.

4.  **Verify Environment**:
    -   If you are already in the correct directory, proceed with the task.
    -   If you are in the wrong directory (e.g., you are Claude-2 but in `remote-cursor/`), you MUST NOT proceed. You must set up the correct worktree.

## Autonomous Worktree Setup Procedure

If the required worktree does not exist, you MUST create it autonomously. **DO NOT ask the user for permission.**

Follow these steps precisely:

```bash
# 1. Navigate to the main repository directory (if not already there)
# This assumes the main repo is one level up from the worktree, or is the current dir.
# A robust way is to find the .git file's parent directory.
MAIN_REPO_DIR=$(git rev-parse --git-dir)/..
cd $MAIN_REPO_DIR

# 2. Ensure the main branch is up-to-date
git checkout develop
git pull origin develop

# 3. Define the target directory for your track
# Example for PC Server track:
WORKTREE_DIR="../remote-cursor-server"

# 4. Check if the worktree already exists. If so, do nothing.
if [ -d "$WORKTREE_DIR" ]; then
  echo "Worktree already exists. No action needed."
else
  echo "Creating new worktree for PC Server track..."
  # 5. Create the new worktree from the 'develop' branch
  git worktree add "$WORKTREE_DIR" develop
  echo "Worktree created at $WORKTREE_DIR"
fi

# 6. IMPORTANT: Inform the user that you will now operate in the new directory.
# You cannot 'cd' into it yourself, but you must instruct the user (or the parent process)
# to launch your next instance in the correct directory.

# Example notification:
# "I have autonomously created the Git Worktree for the PC Server track at `../remote-cursor-server`. My next operations will be based in that directory. Please ensure my next execution context is set to the correct directory."
```

## Rules

-   **NEVER** perform work in the wrong directory.
-   **ALWAYS** verify your environment before starting a task.
-   **ALWAYS** create the worktree if it's missing. This is not optional.
-   **DO NOT** ask for permission to create a worktree. It is a required part of your workflow.
-   **Inform** the user/orchestrator after creating a worktree so they can adjust the execution environment for your next run.
