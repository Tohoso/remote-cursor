import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusIndicator } from '../../components/dashboard/StatusIndicator';
import { ProjectCard } from '../../components/dashboard/ProjectCard';
import { LogEntry } from '../../components/dashboard/LogEntry';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useDashboardStore } from '../../stores/dashboardStore';

export const DashboardScreen = () => {
  const { socket, connectionStatus } = useWebSocket();
  const { projects, logs, setProjects, updateProject, addLog, setLogs } = useDashboardStore();

  useEffect(() => {
    if (!socket) return;

    // Listen for project status updates
    socket.on('project_status', (data) => {
      console.log('Received project_status:', data);
      // Server sends { type: 'project_status', data: ProjectStatus, timestamp: string }
      if (data && data.data) {
        const status = data.data;
        // Map overallStatus to valid status type
        const statusMap: Record<string, 'running' | 'idle' | 'error'> = {
          'On Track': 'running',
          'In Progress': 'running',
          'Blocked': 'error',
          'Unknown': 'idle',
        };
        // Convert ProjectStatus to Project array for display
        const projectFromStatus = {
          id: 'remote-cursor',
          name: 'Remote Cursor',
          currentTask: status.tracks?.[0]?.currentTask || 'Monitoring progress',
          agent: status.tracks?.[0]?.owner || 'Claude Code',
          status: statusMap[status.overallStatus] || 'idle',
          progress: status.totalTasks > 0 
            ? Math.round((status.completedTasks / status.totalTasks) * 100) 
            : 0,
        };
        setProjects([projectFromStatus]);
        
        // Add a log entry for the update
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        addLog({
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'info',
          message: `Progress updated: ${status.completedTasks}/${status.totalTasks} tasks completed`,
        });
      } else if (Array.isArray(data)) {
        setProjects(data);
      } else {
        updateProject(data);
      }
    });

    // Listen for log updates
    socket.on('log_update', (log) => {
      addLog(log);
    });

    // Listen for initial logs
    socket.on('initial_logs', (initialLogs) => {
      setLogs(initialLogs);
    });

    // Request initial data
    socket.emit('get_status');

    return () => {
      socket.off('project_status');
      socket.off('log_update');
      socket.off('initial_logs');
    };
  }, [socket, setProjects, updateProject, addLog, setLogs]);

  return (
    <View className="flex-1 bg-[#1a1a2e]">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            Remote Cursor
          </Text>
          <StatusIndicator status={connectionStatus} />
        </View>

        {/* Project Cards Section */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Active Projects
          </Text>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <Text className="text-gray-500 text-center py-4">
              {connectionStatus === 'connected'
                ? 'No active projects'
                : 'Connecting to server...'}
            </Text>
          )}
        </View>

        {/* Real-time Log Section */}
        <View className="mb-4">
          <Text className="text-white text-lg font-semibold mb-3">
            Real-time Logs
          </Text>
          <View className="bg-[#16213e] rounded-lg p-3">
            {logs.length > 0 ? (
              logs.map((log) => (
                <LogEntry key={log.id} log={log} />
              ))
            ) : (
              <Text className="text-gray-500 text-center py-2">
                {connectionStatus === 'connected'
                  ? 'No logs yet'
                  : 'Waiting for connection...'}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
