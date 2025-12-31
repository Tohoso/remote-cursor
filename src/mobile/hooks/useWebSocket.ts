import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Default to localhost for development
// TODO: Make this configurable via environment variables
const SOCKET_URL = 'http://localhost:3001';

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
