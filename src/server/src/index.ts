import { createServer } from 'http';
import path from 'path';
import { createApp } from './app';
import { setupWebSocket } from './websocket';
import { InstructionHandler } from './services/instructionHandler';
import config from './config';

// Create Express app
const app = createApp();

// Create HTTP server
const server = createServer(app);

// Setup Instruction Handler
const projectRoot = path.resolve(__dirname, '../../..');
const instructionHandler = new InstructionHandler(projectRoot);

// Setup WebSocket server
setupWebSocket(server, instructionHandler);

// Start server
server.listen(config.port, () => {
  console.log('='.repeat(50));
  console.log('Remote Cursor PC Agent Server');
  console.log('='.repeat(50));
  console.log(`HTTP Server: http://localhost:${config.port}`);
  console.log(`WebSocket Server: ws://localhost:${config.port}`);
  console.log(`Project Root: ${projectRoot}`);
  console.log(`Log Level: ${config.logLevel}`);
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
