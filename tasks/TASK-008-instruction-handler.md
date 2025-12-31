# TASK-008: Implement Instruction Handler and Task File Creation

- **Track**: PC Server
- **Owner**: Claude-2
- **Priority**: Medium

## Context

The server needs to listen for `instruction` messages from the mobile app and create new task files based on them.

## Requirements

1.  **WebSocket Listener**:
    -   In the WebSocket server, add logic to handle incoming messages with `type: 'instruction'`.

2.  **Task File Generation**:
    -   When an instruction is received, generate a new task file in the `tasks/` directory.
    -   The filename should follow the convention `MANUS-REQUEST-{timestamp}.md`.
    -   The file content should be based on a template and include the instruction text received from the app.

3.  **Feedback to Client**:
    -   After successfully creating the task file, send a confirmation message back to the client over WebSocket (e.g., `type: 'instruction_received'`).

## Acceptance Criteria

- [ ] The server correctly processes `instruction` type messages.
- [ ] A new task file is created in the `tasks/` directory with the correct name and content.
- [ ] The mobile client receives a confirmation message.
- [ ] The server handles malformed messages gracefully.
