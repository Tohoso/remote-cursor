# TASK-019: WebSocket Communication Enhancement

**EPIC**: 10 - Real-time & Polish
**Track**: server, mobile-app
**Owner**: Claude-1, Claude-2
**Priority**: High

---

## 1. Goal

Enhance the WebSocket communication to be more granular and efficient by introducing new events for incremental updates.

## 2. Context

Currently, any change to `progress.md` triggers a `project_status` event with the entire, large `ProjectStatus` object. This is inefficient. This task will introduce smaller, more targeted events.

## 3. Required Reading

- `docs/design/API_SPECIFICATION.md` (New events: `task_update`, `blocker_alert`)
- `docs/design/DATA_MODEL.md`

## 4. Requirements

### 4.1. Server-Side (Owner: Claude-2)

- **Modify `progressParser`**:
  - The parser should now return not only the new `ProjectStatus` but also a `diff` object that details what has changed (e.g., which task updated, which blocker was added).
- **Enhance WebSocket Emitter**:
  - When a task status changes, emit a `task_update` event with the updated `Task` object as the payload.
  - When a new blocker is detected, emit a `blocker_alert` event with the new `Blocker` object as the payload.
  - Continue to emit the full `project_status` event for major structural changes or on initial connection.

### 4.2. Client-Side (Owner: Claude-1)

- **Update `useWebSocket` Hook**:
  - Add new event handlers for `task_update` and `blocker_alert`.
- **Update `useDashboardStore`**:
  - Create new actions `updateTask(task: Task)` and `addBlocker(blocker: Blocker)`.
  - These actions should perform immutable updates on the `projectStatus` state, updating only the relevant part of the state tree instead of replacing the whole object.
  - This is more efficient and preserves component state better.

## 5. Acceptance Criteria

- **[Server]** When a single task's status changes in `progress.md`, the server emits a `task_update` event.
- **[Server]** When a new blocker is added to `progress.md`, the server emits a `blocker_alert` event.
- **[Client]** The client correctly handles the `task_update` event and updates the specific task in the Zustand store without replacing the entire `projectStatus`.
- **[Client]** The client correctly handles the `blocker_alert` event and adds the new blocker to the store.
- **[Client]** The UI correctly reflects these incremental updates in real-time.

## 6. Dependencies

- **TASK-011**: Parser Enhancement (Server)
- **TASK-012**: State Management (Client)
