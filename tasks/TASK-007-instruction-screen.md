# TASK-007: Implement Instruction Input Screen

- **Track**: Mobile App
- **Owner**: Claude-1
- **Priority**: Medium

## Context

This task involves creating the UI for sending new instructions to the PC Agent Server, as shown in the UI mockups.

## Requirements

1.  **UI Components**:
    -   Create a new screen component `InstructionScreen.tsx`.
    -   Add a multi-line `TextInput` for instruction entry.
    -   Add a "Send Instruction" button.
    -   Include UI elements for setting priority or other metadata if specified in the design.

2.  **WebSocket Integration**:
    -   When the "Send Instruction" button is pressed, send the instruction text to the server via the WebSocket connection.
    -   The message should be a JSON object with a `type: 'instruction'` and a `payload` containing the text.

3.  **Navigation**:
    -   Add a new tab or a button on the Dashboard to navigate to this screen.

## Acceptance Criteria

- [ ] The Instruction screen is accessible from the app's navigation.
- [ ] The UI matches the mockup design.
- [ ] Typing in the text input works correctly.
- [ ] Pressing the "Send" button sends a correctly formatted message over WebSocket.
