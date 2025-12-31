# Remote Cursor

A mobile application that enables developers to monitor and control their Cursor/VSCode development environment from a smartphone.

## Features

- **Real-time Dashboard**: Monitor active projects and view live logs from your development environment
- **Remote Instructions**: Send commands to your PC Agent from your mobile device
- **WebSocket Integration**: Real-time bidirectional communication between mobile app and PC
- **Dark Theme**: Optimized UI for comfortable viewing

## Architecture

This project uses a hybrid architecture:
- **Mobile App**: React Native (Expo) with TypeScript and NativeWind (TailwindCSS)
- **PC Agent Server**: Node.js with Express, WebSocket (Socket.io), and file watching
- **Communication**: WebSocket for real-time updates and command transmission

## Prerequisites

### PC Agent Server
- Node.js v18+
- npm or yarn

### Mobile App
- Node.js v18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator, or physical device with Expo Go app

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Tohoso/remote-cursor.git
cd remote-cursor
```

### 2. Install PC Agent Server

```bash
cd src/server
npm install
npm run build
```

### 3. Install Mobile App

```bash
cd ../mobile
npm install
```

## Running the System

### Step 1: Start the PC Agent Server

```bash
cd src/server
npm start
```

You should see:
```
==================================================
Remote Cursor PC Agent Server
==================================================
HTTP Server: http://localhost:3001
WebSocket Server: ws://localhost:3001
Project Root: /Users/your-username/Projects/remote-cursor
==================================================
```

### Step 2: Start the Mobile App

In a new terminal:

```bash
cd src/mobile
npx expo start
```

Options:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on physical device

## Project Status

**Status**: ✅ **Completed**

Development and end-to-end (E2E) testing of the Remote Cursor application are now complete. All core features have been implemented and verified.

For detailed test results, please see the [E2E Test Report](./E2E_Test_Report.md).

---

## E2E Testing Scenario

Follow these steps to verify the complete end-to-end workflow:

### 1. Verify Server is Running
- PC Agent Server should be running on `http://localhost:3001`
- Check the terminal for server startup messages

### 2. Launch Mobile App
- Start the mobile app using Expo
- The app should automatically attempt to connect to `localhost:3001`

### 3. Check Dashboard Connection
- Open the **Dashboard** tab
- Connection status should show **"Connected"** with a green indicator
- If showing "Connecting..." or "Disconnected", verify server is running

### 4. Test Real-time Updates
- On your PC, modify the `progress.md` file in the project root
- The Dashboard should update in real-time showing the changes
- Logs should appear in the "Real-time Logs" section

### 5. Send an Instruction
- Open the **Instruction** tab in the mobile app
- Type a test instruction (e.g., "Create a new React component called Button")
- Press **"Send Instruction"**
- The input field should clear after sending

### 6. Verify Task File Creation
- On your PC, check the `tasks/` directory
- A new task file should be created with a timestamp-based filename
- The file should contain your instruction

### 7. Check Confirmation
- The mobile app should receive a confirmation via WebSocket
- Check the Dashboard logs for the instruction event

## Project Structure

```
remote-cursor/
├── src/
│   ├── mobile/              # React Native mobile app
│   │   ├── app/
│   │   │   └── screens/     # Screen components
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── navigation/      # Navigation setup
│   │   ├── stores/          # State management (Zustand)
│   │   └── data/            # Mock data and types
│   │
│   └── server/              # PC Agent Server
│       ├── src/
│       │   ├── config/      # Configuration
│       │   ├── routes/      # HTTP routes
│       │   ├── services/    # Business logic
│       │   └── websocket/   # WebSocket handlers
│       └── dist/            # Compiled JavaScript
│
├── tasks/                   # Task files
├── docs/                    # Documentation
└── progress.md              # Development progress tracking
```

## Configuration

### Server Configuration

Create a `.env` file in `src/server/`:

```env
PORT=3001
PROJECT_ROOT=/path/to/your/remote-cursor
WATCH_PATHS=progress.md,tasks
LOG_LEVEL=info
```

### Mobile App Configuration

WebSocket URL is configured in `src/mobile/hooks/useWebSocket.ts`:

```typescript
const SOCKET_URL = 'http://localhost:3001';
```

For physical devices, replace `localhost` with your PC's local IP address.

## Troubleshooting

### Mobile App Cannot Connect

1. **Check server is running**: Verify the PC Agent Server is running on port 3001
2. **Check network**: Ensure mobile device and PC are on the same network
3. **Update WebSocket URL**: If using a physical device, update `SOCKET_URL` to your PC's IP address
4. **Firewall**: Ensure port 3001 is not blocked by your firewall

### Server Not Starting

1. **Build TypeScript**: Run `npm run build` in `src/server/`
2. **Check dependencies**: Run `npm install` in `src/server/`
3. **Port conflict**: Ensure port 3001 is not already in use

### Real-time Updates Not Working

1. **Verify connection**: Check Dashboard shows "Connected" status
2. **Check file watcher**: Ensure `progress.md` exists in project root
3. **Check server logs**: Look for file change events in server terminal

## Development

### Mobile App Development

```bash
cd src/mobile
npx expo start
```

Hot reload is enabled by default.

### Server Development

```bash
cd src/server
npm run dev  # Uses nodemon for auto-restart
```

## Technologies Used

### Mobile App
- React Native
- Expo
- TypeScript
- NativeWind (TailwindCSS)
- Socket.io-client
- Zustand (state management)
- React Navigation

### PC Server
- Node.js
- Express
- Socket.io
- TypeScript
- Chokidar (file watching)

## Contributing

This project follows the **Manus × Claude Code Collaboration Workflow**. See `CLAUDE.md` for development guidelines.

## License

MIT

## Support

For issues and questions, please create an issue on GitHub.

---

## Development Progress

Current progress is tracked in [progress.md](./progress.md).

## Documentation

- [Requirements (Japanese)](./docs/requirements/requirements_definition.md)
- [Architecture Design (Japanese)](./docs/design/architecture_design.md)
- [E2E Test Report](./E2E_Test_Report.md)
- [UI Mockups](./docs/mockups/)
