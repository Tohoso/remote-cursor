# TASK-017: Blocker Detail Screen Implementation

**EPIC**: 08 - Blocker Detail Screen
**Track**: mobile-app
**Owner**: Claude-1
**Priority**: High

---

## 1. Goal

Implement the Blocker Detail screen, which allows users to view detailed information about a specific blocker and send instructions to resolve it.

## 2. Context

This screen is crucial for the user to interact with the system and resolve issues that are halting development. It is navigated to from the `BlockerAlert` on the Dashboard.

## 3. Required Reading

- `docs/design/COMPONENT_DESIGN.md` (Blocker Detail components)
- `docs/design/API_SPECIFICATION.md` (`send_instruction` event)
- `docs/implementation/WIREFRAME_SPEC.md` (Blocker Detail screen wireframe)

## 4. Requirements

### 4.1. Screen Structure

- Create a new screen component `src/mobile/app/screens/BlockerDetailScreen.tsx`.
- The screen should receive a `blockerId` as a route parameter.
- Use the `blockerId` to select the specific blocker from the `useDashboardStore`.

### 4.2. UI Components

- **`BlockerCard`**:
  - Implement `src/mobile/components/blocker/BlockerCard.tsx`.
  - It should display all details of a `Blocker` object (reason, impacted tasks, etc.).
  - Refer to `COMPONENT_DESIGN.md` for props and structure.

- **`ResolveBlockerForm`**:
  - Implement `src/mobile/components/blocker/ResolveBlockerForm.tsx`.
  - It must contain a `TextInput` for the user to write instructions and a "Send Instruction" `Button`.
  - On send, it should emit a `send_instruction` WebSocket event with the instruction text and the `blockerId` in the context.

### 4.3. State and Logic

- The screen should use a selector `useBlockerById(blockerId)` to get the blocker data from the Zustand store.
- The `ResolveBlockerForm` should use the `useWebSocket` hook to send the instruction.
- Display a toast notification (success or error) after the `instruction_response` is received.

## 5. Acceptance Criteria

- [ ] The Blocker Detail screen is accessible from the Dashboard's `BlockerAlert`.
- [ ] The screen correctly displays all information for the selected blocker using the `BlockerCard` component.
- [ ] The `ResolveBlockerForm` is displayed and functional.
- [ ] Typing in the form updates its internal state.
- [ ] Pressing "Send Instruction" emits the correct `send_instruction` event with the correct payload to the server.
- [ ] A success or error toast is shown after the server responds.
- [ ] The implementation matches the wireframe in `WIREFRAME_SPEC.md`.

## 6. Dependencies

- **TASK-015**: Navigation Setup (for screen registration)
- **TASK-012**: State Management (for `useDashboardStore`)

