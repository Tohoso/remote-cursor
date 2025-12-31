# TASK-004: Implement WebSocket Connection and Real-time Dashboard

- **Track**: Mobile App
- **Owner**: Claude-1
- **Priority**: High

## Context

The Dashboard screen currently uses mock data. This task involves replacing it with real-time data from the PC Agent Server via a WebSocket connection.

## Requirements

1.  **WebSocket Client**:
    -   Implement a WebSocket client using `socket.io-client` or a similar library.
    -   Create a reusable hook (e.g., `useWebSocket`) to manage the connection state (connecting, connected, disconnected).
    -   The client should automatically attempt to reconnect if the connection is lost.

2.  **Dashboard Integration**:
    -   Use the WebSocket hook in the `DashboardScreen`.
    -   Subscribe to `project_status` and `log_update` events.
    -   Update the project status cards and log entries in real-time as new data is received from the server.

3.  **State Management**:
    -   Use a state management solution (like Zustand or React Context) to handle the incoming real-time data and make it available to the UI components.

## Acceptance Criteria

- [ ] The app connects to the WebSocket server on launch.
- [ ] The Dashboard displays a "Connecting..." or similar state initially.
- [ ] Once connected, the Dashboard updates with data received from the server.
- [ ] Mock data is completely removed from the Dashboard screen.
- [ ] The app gracefully handles connection drops and attempts to reconnect.
