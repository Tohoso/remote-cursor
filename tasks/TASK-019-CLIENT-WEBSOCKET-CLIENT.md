# TASK-019-CLIENT: WebSocket Communication Enhancement (Client-Side)

**EPIC**: 10 - Real-time & Polish
**Track**: mobile-app
**Owner**: Claude-1
**Priority**: High

---

## 1. Goal

Implement client-side handling of the new granular WebSocket events (`task_update`, `blocker_alert`) introduced in TASK-019 (Server-Side).

## 2. Context

TASK-019 (Server-Side) has been completed. The server now emits:
- `task_update` - When individual task status changes
- `blocker_alert` - When a new blocker is detected
- `project_status` - For major structural changes (unchanged)

The client needs to handle these new events and update the Zustand store efficiently.

## 3. Required Reading

- `docs/design/API_SPECIFICATION.md` (Events: `task_update`, `blocker_alert`)
- `docs/design/DATA_MODEL.md` (`Task`, `Blocker`, `ProjectStatusDiff`)
- `src/common/types.ts` (Updated with `ProjectStatusDiff`)
- `src/server/src/index.ts` (Reference: how server emits events)

## 4. Requirements

### 4.1. Update `useWebSocket.ts`

Add new event handlers for the granular events:

```typescript
// task_update event
newSocket.on('task_update', (payload: { type: string; data: Task; timestamp: string }) => {
  console.log('Received task_update:', payload);
  updateTask(payload.data);
  addLog({
    id: `log-${Date.now()}`,
    timestamp: payload.timestamp,
    message: `タスク更新: ${payload.data.id} → ${payload.data.status}`,
    level: 'info',
    source: 'websocket',
  });
});

// blocker_alert event
newSocket.on('blocker_alert', (payload: { type: string; data: Blocker; timestamp: string }) => {
  console.log('Received blocker_alert:', payload);
  addBlocker(payload.data);
  addLog({
    id: `log-${Date.now()}`,
    timestamp: payload.timestamp,
    message: `⚠️ 新しいブロッカー: ${payload.data.title}`,
    level: 'warning',
    source: 'websocket',
  });
});
```

### 4.2. Update `dashboardStore.ts`

Add new actions for incremental updates:

```typescript
interface DashboardActions {
  // ... existing actions
  updateTask: (task: Task) => void;
  addBlocker: (blocker: Blocker) => void;
  resolveBlocker: (blockerId: string) => void;
}

// Implementation
updateTask: (task) => set((state) => {
  if (!state.projectStatus) return state;
  
  const updatedTracks = state.projectStatus.tracks.map(track => ({
    ...track,
    tasks: track.tasks.map(t => t.id === task.id ? task : t)
  }));
  
  // Recalculate completed tasks
  const completedTasks = updatedTracks.reduce((sum, track) => 
    sum + track.tasks.filter(t => t.status === 'done').length, 0
  );
  
  return {
    projectStatus: {
      ...state.projectStatus,
      tracks: updatedTracks,
      completedTasks,
      lastUpdated: new Date().toISOString()
    }
  };
}),

addBlocker: (blocker) => set((state) => {
  if (!state.projectStatus) return state;
  
  // Check if blocker already exists
  if (state.projectStatus.blockers.some(b => b.id === blocker.id)) {
    return state;
  }
  
  return {
    projectStatus: {
      ...state.projectStatus,
      blockers: [...state.projectStatus.blockers, blocker],
      lastUpdated: new Date().toISOString()
    }
  };
}),

resolveBlocker: (blockerId) => set((state) => {
  if (!state.projectStatus) return state;
  
  return {
    projectStatus: {
      ...state.projectStatus,
      blockers: state.projectStatus.blockers.filter(b => b.id !== blockerId),
      lastUpdated: new Date().toISOString()
    }
  };
}),
```

### 4.3. Import Required Types

Ensure `Task` and `Blocker` types are imported from `@common/types`:

```typescript
import { Task, Blocker, ProjectStatus, ConnectionStatus } from '@common/types';
```

## 5. Acceptance Criteria

- [ ] `useWebSocket` handles `task_update` event and calls `updateTask`
- [ ] `useWebSocket` handles `blocker_alert` event and calls `addBlocker`
- [ ] `dashboardStore` has `updateTask` action that updates specific task immutably
- [ ] `dashboardStore` has `addBlocker` action that adds new blocker
- [ ] `dashboardStore` has `resolveBlocker` action that removes blocker
- [ ] UI updates correctly when receiving incremental events
- [ ] Log entries are created for each event
- [ ] TypeScript compiles without errors
- [ ] Existing `project_status` handling continues to work

## 6. Dependencies

- **TASK-012**: State Management (Completed)
- **TASK-019**: WebSocket Enhancement Server-Side (Completed)

## 7. Testing

### Manual Testing Steps

1. Start the server: `cd src/server && npm start`
2. Start the mobile app: `cd src/mobile && npm start`
3. Connect the app to the server
4. Modify `progress.md` to change a single task status
5. Verify the app receives `task_update` and updates only that task
6. Add a new blocker to `progress.md`
7. Verify the app receives `blocker_alert` and shows the new blocker
8. Check the activity log for new entries
