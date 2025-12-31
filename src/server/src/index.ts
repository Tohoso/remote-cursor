import { createServer } from 'http';
import { createApp } from './app';
import { setupWebSocket, broadcastProjectStatus } from './websocket';
import { FileWatcher } from './services/fileWatcher';
import config from './config';

// Create Express app
const app = createApp();

// Create HTTP server
const server = createServer(app);

// Setup WebSocket server
const wss = setupWebSocket(server);

// Setup File Watcher
const fileWatcher = new FileWatcher(config.watchDir);

// Start server
server.listen(config.port, () => {
  console.log('='.repeat(50));
  console.log('Remote Cursor PC Agent Server');
  console.log('='.repeat(50));
  console.log(`HTTP Server: http://localhost:${config.port}`);
  console.log(`WebSocket Server: ws://localhost:${config.port}`);
  console.log(`Watch Directory: ${config.watchDir}`);
  console.log(`Log Level: ${config.logLevel}`);
  console.log('='.repeat(50));

  // Start file watcher and broadcast status changes
  fileWatcher.start((status) => {
    console.log('Project status updated:', status.overallStatus);
    broadcastProjectStatus(wss, status);
  });
});

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutdown signal received: closing servers...');
  await fileWatcher.stop();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
