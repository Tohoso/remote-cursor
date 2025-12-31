# TASK-005: Initialize Node.js server with Express and WebSocket

## Track Information

| Item | Value |
|------|-------|
| **Track** | PC Agent Server (Backend) |
| **Owner** | Claude-2 |
| **Branch** | `feature/server/task-005-init-server` |
| **Directory** | `src/server/` |

## 1. Context

This is the first task for the PC Agent Server track. The server will run on the user's PC and act as a bridge between the mobile app and the local development environment (Cursor/VSCode).

Refer to `docs/design/architecture_design.md` for the overall architecture.

## 2. Requirements

### 2.1 Directory Structure

Create the following structure inside `src/server/`:

```
src/server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts           # Entry point
│   ├── app.ts             # Express app setup
│   ├── config/
│   │   └── index.ts       # Configuration (port, paths, etc.)
│   ├── routes/
│   │   └── index.ts       # API routes
│   ├── services/
│   │   └── (to be added later)
│   └── websocket/
│       └── index.ts       # WebSocket server setup
└── .gitignore
```

### 2.2 Dependencies

Initialize a Node.js project with TypeScript and install the following:

```bash
npm init -y
npm install express ws cors dotenv
npm install -D typescript @types/node @types/express @types/ws ts-node nodemon
```

### 2.3 Basic Server Implementation

1.  **Express Server**: Create a basic Express server that listens on a configurable port (default: 3001).
2.  **WebSocket Server**: Attach a WebSocket server to the Express server.
3.  **Health Check Endpoint**: Implement a `GET /api/health` endpoint that returns `{ status: "ok", timestamp: ... }`.
4.  **CORS Configuration**: Enable CORS for development.
5.  **Environment Variables**: Use `dotenv` for configuration. Create a `.env.example` file.

### 2.4 Scripts in `package.json`

```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

## 3. Acceptance Criteria

-   [ ] `src/server/` directory exists with the specified structure.
-   [ ] `npm install` completes without errors.
-   [ ] `npm run dev` starts the server successfully.
-   [ ] `GET http://localhost:3001/api/health` returns a valid JSON response.
-   [ ] WebSocket server is running and accepts connections (can be tested with a simple client or browser console).

## 4. Technical Notes

### WebSocket Test (Browser Console)

```javascript
const ws = new WebSocket('ws://localhost:3001');
ws.onopen = () => console.log('Connected');
ws.onmessage = (e) => console.log('Message:', e.data);
ws.send('Hello');
```

### .env.example

```
PORT=3001
LOG_LEVEL=debug
```

## 5. Priority

**High** - This is the foundation for all server-side functionality.

## 6. Agent Delegation

This task should be handled by **maker-agent**.

## 7. Notes for Claude-2

-   You are working on the **PC Agent Server** track.
-   Your code should be entirely within `src/server/`.
-   Do not modify files in `src/mobile/` (that's Claude-1's territory).
-   Update the **PC Server Timeline** section in `progress.md` when done.
