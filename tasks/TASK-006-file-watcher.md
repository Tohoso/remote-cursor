# TASK-006: Implement File Watcher and Project Status Emitter

- **Track**: PC Server
- **Owner**: Claude-2
- **Priority**: High

## Context

The PC Agent Server needs to monitor the development project for changes and broadcast the status to connected mobile clients via WebSocket.

## Requirements

1.  **File Watcher**:
    -   Use a library like `chokidar` to monitor the project directory for file changes.
    -   The watched directory should be configurable via `.env`.
    -   It should watch for changes in `progress.md` and other relevant source files.

2.  **Project Status Logic**:
    -   Implement a service that reads `progress.md` and parses the status of each track and task.
    -   This service should determine the overall project status (e.g., On Track, Blocked).

3.  **WebSocket Emitter**:
    -   When the file watcher detects a change in `progress.md`, trigger the project status logic.
    -   Broadcast the updated project status to all connected WebSocket clients using a `project_status` event.
    -   The payload should be a JSON object containing the structured status data.

## Acceptance Criteria

- [ ] The server starts monitoring the configured directory on startup.
- [ ] Changes to `progress.md` trigger a WebSocket broadcast.
- [ ] All connected clients receive the `project_status` event with updated data.
- [ ] The file watcher is robust and handles file add/change/delete events.
