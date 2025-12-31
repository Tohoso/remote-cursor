# TASK-020: Push Notification Implementation

**EPIC**: 11 - Real-time & Polish
**Track**: mobile-app
**Owner**: Claude-1
**Priority**: Medium

---

## 1. Goal

Implement push notifications to alert the user of critical events (like new blockers) even when the app is in the background.

## 2. Context

Push notifications are essential for making this a true monitoring tool, allowing users to be proactively informed of issues without having to keep the app open.

## 3. Requirements

### 3.1. Setup

- Integrate `expo-notifications` library into the project.
- Implement the logic to request notification permissions from the user on the first app launch.

### 3.2. Handling Notifications

- **Foreground Notifications**: When a `blocker_alert` event is received while the app is in the foreground, display an in-app notification (a toast or a custom banner) instead of a system notification.
- **Background Notifications**: When the app is in the background, a system push notification should be displayed.
- **Trigger**: The server-side logic for sending the push notification is out of scope for this task (it will be handled by a separate service in the future). For now, the client should trigger a **local notification** whenever it receives a `blocker_alert` event and the app is in the background.

### 3.3. Notification Content

- The notification title should be "New Blocker Detected".
- The body should contain the reason for the blocker (e.g., `blocker.reason`).
- Tapping the notification should open the app and navigate directly to the corresponding `BlockerDetailScreen`.

## 4. Acceptance Criteria

- [ ] The app requests notification permissions on first launch.
- [ ] When a `blocker_alert` is received while the app is in the background, a system push notification is displayed.
- [ ] The notification content is correct (title and body).
- [ ] Tapping the notification opens the app and navigates to the correct `BlockerDetailScreen`.
- [ ] When a `blocker_alert` is received while the app is in the foreground, a simple in-app alert is shown instead of a system notification.

## 5. Dependencies

- **TASK-019**: WebSocket Enhancement (for the `blocker_alert` event)
