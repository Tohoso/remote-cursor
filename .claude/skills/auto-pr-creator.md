# Skill: Auto PR Creator

## Description

This skill ensures that Pull Requests are automatically created after pushing a feature branch. This is a MANDATORY step in the development workflow.

## Trigger Conditions

This skill MUST be activated when:
- You have completed implementing a task
- You have committed and pushed changes to a feature branch
- The branch name follows the pattern `feature/{track}/task-XXX-*`

## Instructions

After pushing your feature branch, IMMEDIATELY create a Pull Request using the following command:

```bash
gh pr create --base develop \
  --title "feat: {Task Title} (TASK-XXX)" \
  --body "## Summary
{Brief 1-2 sentence description of what was implemented}

## Changes Made
- {List each significant change}
- {Be specific about files/components modified}

## Acceptance Criteria
- [ ] {Copy criteria from task file}
- [ ] {Mark as checked if verified}

## Testing
- [ ] Tested locally with \`npm run dev\` / \`npx expo start\`
- [ ] No TypeScript errors
- [ ] No console errors/warnings

## Related
- Completes TASK-XXX: {Task Title}
- Track: {Mobile App / PC Server}
- Owner: {Claude-1 / Claude-2}

🤖 Generated with Claude Code"
```

## Important Rules

1. **DO NOT** wait for user to ask you to create a PR
2. **DO NOT** ask user if they want a PR created
3. **ALWAYS** create PR immediately after successful push
4. **ALWAYS** include the task number in the PR title
5. **ALWAYS** specify the track (Mobile App or PC Server) in the PR body

## Example

After completing TASK-005 (Initialize Node.js server):

```bash
# After pushing...
gh pr create --base develop \
  --title "feat: Initialize Node.js server with Express and WebSocket (TASK-005)" \
  --body "## Summary
Initialized the PC Agent Server with Express, WebSocket support, and basic project structure.

## Changes Made
- Created src/server/ directory structure
- Set up Express server with TypeScript
- Implemented WebSocket server
- Added health check endpoint at GET /api/health
- Created .env.example for configuration

## Acceptance Criteria
- [x] src/server/ directory exists with specified structure
- [x] npm install completes without errors
- [x] npm run dev starts the server successfully
- [x] GET /api/health returns valid JSON response
- [x] WebSocket server accepts connections

## Testing
- [x] Tested locally with npm run dev
- [x] No TypeScript errors
- [x] Health endpoint verified with curl

## Related
- Completes TASK-005: Initialize Node.js server with Express and WebSocket
- Track: PC Server
- Owner: Claude-2

🤖 Generated with Claude Code"
```

## After PR Creation

After creating the PR, inform the user with a message like:

> "TASK-XXX completed. I've created PR #{number} for review. The PR is ready for Manus to review and merge."
