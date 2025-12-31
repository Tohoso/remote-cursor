# TASK-018: Activity Log Screen Implementation

**EPIC**: 09 - Activity Log Screen
**Track**: mobile-app
**Owner**: Claude-1
**Priority**: Medium

---

## 1. Goal

Implement the Activity Log screen, which displays a real-time stream of log entries from the server and allows for basic filtering.

## 2. Context

This screen provides transparency into the system's operations, showing what the agents are doing, what files are being changed, and any errors that occur.

## 3. Required Reading

- `docs/design/COMPONENT_DESIGN.md` (Activity Log components)
- `docs/design/STATE_MANAGEMENT.md` (Log state in Zustand)
- `docs/implementation/WIREFRAME_SPEC.md` (Activity Log screen wireframe)

## 4. Requirements

### 4.1. Screen Structure

- Create a new screen component `src/mobile/app/screens/ActivityLogScreen.tsx`.
- The screen should be accessible from the main bottom tab navigation.

### 4.2. UI Components

- **`FilterChips`**:
  - Implement `src/mobile/components/activity/FilterChips.tsx`.
  - It should display a chip for each log source (e.g., 'claude-1', 'claude-2', 'server') and an 'All' chip.
  - Tapping a chip should filter the displayed logs.

- **`LogEntry`**:
  - Enhance the existing `LogEntry` component.
  - It should display the log's timestamp, source, level (with a corresponding color), and message.
  - The design should match the wireframe.

### 4.3. State and Logic

- The screen should get the log data from `useDashboardStore` using the `useLogs` selector.
- Implement a local state `activeFilter` to manage the currently selected filter chip.
- When `activeFilter` changes, the displayed list of logs should be filtered accordingly.
- The list should be a `FlatList` for performance, displaying logs in reverse chronological order (newest first).
- The `useWebSocket` hook will automatically add new logs to the store via the `log_entry` event, and the screen should update in real-time.

## 5. Acceptance Criteria

- [ ] The Activity Log screen is accessible from the bottom tab navigator.
- [ ] The screen displays a list of log entries from the `dashboardStore`.
- [ ] New logs received from the server appear at the top of the list in real-time.
- [ ] The `FilterChips` component is displayed and functional.
- [ ] Tapping a filter chip correctly filters the list of logs by source.
- [ ] The styling of each `LogEntry` (colors, icons) matches the wireframe and the log's `level`.

## 6. Dependencies

- **TASK-015**: Navigation Setup (for screen registration)
- **TASK-012**: State Management (for `useDashboardStore`)
