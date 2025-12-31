# Remote Cursor - State Management Design

**Version**: 1.0  
**Date**: 2025-01-01  
**Author**: Manus AI

---

## 1. Overview

This document defines the state management architecture for the Remote Cursor mobile application. We will use Zustand, a small, fast, and scalable state-management solution.

## 2. Core Principles

- **Single Source of Truth**: The `dashboardStore` will be the single source of truth for all project-related data received from the server.
- **Selectors for Performance**: Components will subscribe to the smallest possible slice of state using selectors to prevent unnecessary re-renders.
- **Actions for Mutations**: State mutations will only occur through actions defined in the store.
- **Normalized State**: Where applicable, data will be stored in a normalized fashion to avoid duplication and simplify updates.

## 3. Store Design

We will use a single primary store, `useDashboardStore`, to manage all application state related to project progress and server communication.

### `useDashboardStore`

- **File**: `src/mobile/stores/dashboardStore.ts`

#### State (`DashboardState`)

| Property | Type | Description |
|:---|:---|:---|
| `projectStatus` | `ProjectStatus | null` | The raw, complete project status object received from the server. |
| `connectionStatus` | `"connected" | "disconnected" | "connecting"` | The current status of the WebSocket connection. |
| `logs` | `ActivityLogEntry[]` | A capped array of the most recent log entries. |

#### Actions

| Action | Parameters | Description |
|:---|:---|:---|
| `setProjectStatus` | `status: ProjectStatus` | Overwrites the entire `projectStatus` object. |
| `setConnectionStatus` | `status: "connected" | ...` | Updates the WebSocket connection status. |
| `addLog` | `log: ActivityLogEntry` | Prepends a new log entry to the `logs` array and caps the array size. |
| `clearLogs` | - | Clears all log entries. |

#### Selectors

To optimize performance, components will not access the `projectStatus` object directly. Instead, they will use memoized selectors.

| Selector | Return Type | Description |
|:---|:---|:---|
| `useTracks` | `Track[]` | Returns the array of tracks. |
| `useTrackById` | `(id: string) => Track | undefined` | Returns a specific track by its ID. |
| `useBlockers` | `Blocker[]` | Returns the array of active blockers. |
| `useOverallProgress` | `{ completed: number; total: number; }` | Returns the overall task completion numbers. |
| `useLogs` | `ActivityLogEntry[]` | Returns the array of logs. |
| `useFilteredLogs` | `(source: string) => ActivityLogEntry[]` | Returns logs filtered by a specific source. |

## 4. Data Flow

### Server to UI Data Flow

```mermaid
graph TD
    A[WebSocket Event] -- `project_status` --> B(useWebSocket Hook);
    B -- calls --> C{`actions.setProjectStatus(data)`};
    C -- updates --> D[Zustand Store (`projectStatus`)];
    D -- triggers re-render via --> E(Selectors);
    E -- `useTracks()` --> F[DashboardScreen];
    E -- `useBlockers()` --> G[BlockerAlert];
```

1. The `useWebSocket` hook receives a `project_status` event.
2. It calls the `setProjectStatus` action from the `useDashboardStore`.
3. The store's state is updated.
4. Components subscribed to selectors (e.g., `useTracks`) are re-rendered with the new data.

### UI to Server Data Flow

```mermaid
graph TD
    A[User taps "Send Instruction"] -- in `ResolveBlockerForm` --> B{`handleSubmit()`};
    B -- calls --> C[useWebSocket Hook (`socket.emit`)];
    C -- `send_instruction` --> D[Server];
    D -- `instruction_response` --> C;
    C -- calls --> E{`actions.addLog(response)`};
    E -- updates --> F[Zustand Store (`logs`)];
```

1. A user action in a component triggers a handler function.
2. The handler calls the `socket.emit` function provided by the `useWebSocket` hook.
3. The server processes the event and sends a response.
4. The `useWebSocket` hook receives the response and calls an appropriate action (e.g., `addLog`) to update the UI.

## 5. Persistence

State persistence is not a requirement for Sprint 2. The application will fetch the latest state from the server upon every connection. If offline capabilities are needed in the future, `zustand/middleware/persist` can be integrated to cache the last known state in AsyncStorage.

## 6. Debugging

`zustand/middleware/devtools` will be used to connect the store to React Native Flipper or the browser's Redux DevTools, allowing for time-travel debugging and state inspection during development.

