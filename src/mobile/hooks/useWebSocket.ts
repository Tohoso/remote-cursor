import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Use environment variable or fallback to public server URL
// For local development: http://localhost:3001
// For deployed testing: use the exposed public URL
const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'https://3001-iegsqpt4pp2cqp7dov0ek-f2bdf844.sg1.manus.computer';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  useEffect(() => {
    // Create socket connection
    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      transports: ['websocket', 'polling'],
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('WebSocket connected');
      setConnectionStatus('connected');
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setConnectionStatus('disconnected');
    });

    newSocket.on('reconnect_attempt', () => {
      console.log('WebSocket reconnecting...');
      setConnectionStatus('connecting');
    });

    setSocket(newSocket);
    setConnectionStatus('connecting');

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return { socket, connectionStatus };
};
