import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { InstructionHandler } from '../services/instructionHandler';

export function setupWebSocket(
  server: HttpServer,
  instructionHandler: InstructionHandler
): WebSocketServer {
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
    ws.on('message', async (data: Buffer) => {
      try {
        const messageStr = data.toString();
        console.log('Received message:', messageStr);

        // Parse JSON message
        let message: unknown;
        try {
          message = JSON.parse(messageStr);
        } catch {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Invalid JSON format',
            timestamp: new Date().toISOString(),
          }));
          return;
        }

        // Handle different message types
        if (typeof message === 'object' && message !== null && 'type' in message) {
          const msgType = (message as { type: string }).type;

          if (msgType === 'instruction') {
            await handleInstructionMessage(ws, message, instructionHandler);
          } else {
            // Echo back other messages
            ws.send(JSON.stringify({
              type: 'echo',
              data: message,
              timestamp: new Date().toISOString(),
            }));
          }
        } else {
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Message must be an object with a type field',
            timestamp: new Date().toISOString(),
          }));
        }
      } catch (error) {
        console.error('Error handling message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Internal server error',
          timestamp: new Date().toISOString(),
        }));
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

/**
 * Handle instruction message
 */
async function handleInstructionMessage(
  ws: WebSocket,
  message: unknown,
  handler: InstructionHandler
): Promise<void> {
  // Validate instruction
  if (!handler.validateInstruction(message)) {
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Invalid instruction format. Expected: { type: "instruction", instruction: "..." }',
      timestamp: new Date().toISOString(),
    }));
    return;
  }

  console.log('Processing instruction:', message.instruction);

  // Handle instruction and create task file
  const result = await handler.handleInstruction(message);

  // Send response to client
  if (result.success) {
    ws.send(JSON.stringify({
      type: 'instruction_received',
      message: result.message,
      filename: result.filename,
      timestamp: new Date().toISOString(),
    }));
  } else {
    ws.send(JSON.stringify({
      type: 'error',
      message: result.message,
      error: result.error,
      timestamp: new Date().toISOString(),
    }));
  }
}
