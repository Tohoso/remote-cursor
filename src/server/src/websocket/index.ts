import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

export function setupWebSocket(server: HttpServer): WebSocketServer {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to Remote Cursor PC Agent Server',
      timestamp: new Date().toISOString(),
    }));

    // Handle incoming messages
    ws.on('message', (data: Buffer) => {
      try {
        const message = data.toString();
        console.log('Received message:', message);

        // Echo back for now
        ws.send(JSON.stringify({
          type: 'echo',
          data: message,
          timestamp: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    // Handle connection close
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    // Handle errors
    ws.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  });

  console.log('WebSocket server initialized');
  return wss;
}
