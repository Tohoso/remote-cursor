# Manus Delegator Skill

## Description

This skill enables delegation of tasks to Manus when research, architectural decisions, or orchestration-level guidance is needed. Manus acts as the project orchestrator and handles tasks that require broader context or external research.

## Trigger

MUST BE USED PROACTIVELY when encountering:

| Situation | Example |
|-----------|---------|
| Need external research | "What's the best library for WebRTC in React Native?" |
| Architectural decisions | "Should we use Redux or Context for state management?" |
| Design clarification | "How should the error handling flow work?" |
| Requirement ambiguity | "The mockup shows X but requirement says Y" |
| Integration questions | "How should Tailscale be configured for this use case?" |
| Blockers requiring research | "Getting error X, need to investigate cause" |

## How to Delegate

Create a delegation request file in `tasks/` directory:

### Filename Format
`MANUS-REQUEST-{number}-{short-description}.md`

### Content Format
```markdown
# Manus Request: [Title]

## Type
[ ] Research
[ ] Architectural Decision
[ ] Design Clarification
[ ] Requirement Clarification
[ ] Other: [Specify]

## Context
[Describe the current situation and what you're working on]

## Question/Request
[Specific question or request for Manus]

## Options Considered (if applicable)
1. [Option A]: [Pros/Cons]
2. [Option B]: [Pros/Cons]

## Impact
[What is blocked or affected by this decision]

## Urgency
[ ] Blocking - Cannot proceed without answer
[ ] High - Significantly impacts progress
[ ] Medium - Can work around temporarily
[ ] Low - Nice to have clarification
```

## After Delegation

1. Update `progress.md` to indicate waiting for Manus response
2. Continue with other non-blocked tasks if possible
3. Check for Manus response in `tasks/MANUS-RESPONSE-*.md` files

## Response Handling

When Manus responds:
1. Read the response file carefully
2. Update `progress.md` with the decision
3. Add to Decision Log if it's a significant decision
4. Proceed with implementation based on guidance

## Important

- Be specific in your requests
- Provide context about what you've already tried
- Don't wait for Manus on trivial decisions - use your judgment
- Manus responses may include updated requirements or design changes
