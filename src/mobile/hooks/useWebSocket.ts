import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDashboardStore } from '../stores/dashboardStore';
import { ProjectStatus } from '@common/types';

// Use environment variable or fallback to public server URL
// For local development: http://localhost:3001
// For deployed testing: use the exposed public URL
const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'https://3001-iegsqpt4pp2cqp7dov0ek-f2bdf844.sg1.manus.computer';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { connectionStatus, setProjectStatus, setConnectionStatus, addLog } = useDashboardStore();

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

    // Handle project_status event
    newSocket.on('project_status', (data: any) => {
      console.log('Received project_status:', data);

      // Server sends { type: 'project_status', data: ProjectStatus, timestamp: string }
      if (data && data.data) {
        const projectStatus: ProjectStatus = data.data;
        setProjectStatus(projectStatus);

        // Add a log entry for the update
        addLog({
          id: `log-${Date.now()}`,
          timestamp: data.timestamp || new Date().toISOString(),
          source: 'system',
          level: 'info',
          message: `Progress updated: ${projectStatus.completedTasks}/${projectStatus.totalTasks} tasks completed`,
        });
      }
    });

    setSocket(newSocket);
    setConnectionStatus('connecting');

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [setProjectStatus, setConnectionStatus, addLog]);

  return { socket, connectionStatus };
};
