import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusIndicator } from '../../components/dashboard/StatusIndicator';
import { ProjectCard } from '../../components/dashboard/ProjectCard';
import { LogEntry } from '../../components/dashboard/LogEntry';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useDashboardStore, useTracks, useOverallProgress } from '../../stores/dashboardStore';
import { Project } from '../../data/mockData';

export const DashboardScreen = () => {
  // Initialize WebSocket connection (handles all event subscriptions internally)
  useWebSocket();

  // Get data from store using selectors
  const tracks = useTracks();
  const overallProgress = useOverallProgress();
  const { connectionStatus, logs } = useDashboardStore();

  // Map Track data to legacy Project format for existing components
  // This will be refactored in TASK-013 when Dashboard UI is rebuilt
  const projects: Project[] = tracks.map((track) => {
    const statusMap: Record<string, 'running' | 'idle' | 'error'> = {
      'active': 'running',
      'paused': 'idle',
      'completed': 'idle',
    };

    // Find current task (first in_progress or not_started task)
    const currentTask = track.tasks.find(
      (task) => task.status === 'in_progress' || task.status === 'not_started'
    );

    return {
      id: track.id,
      name: track.name,
      currentTask: currentTask?.title || 'No active task',
      agent: track.agent,
      status: statusMap[track.status] || 'idle',
      progress: track.progress,
    };
  });

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

        {/* Overall Progress */}
        {overallProgress.total > 0 && (
          <View className="mb-6 bg-[#16213e] rounded-lg p-4">
            <Text className="text-white text-sm mb-2">Overall Progress</Text>
            <Text className="text-white text-lg font-bold">
              {overallProgress.completed} / {overallProgress.total} tasks completed
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              Status: {overallProgress.status}
            </Text>
          </View>
        )}

        {/* Project Cards Section */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Active Tracks
          </Text>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <Text className="text-gray-500 text-center py-4">
              {connectionStatus === 'connected'
                ? 'No active tracks'
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
                <LogEntry
                  key={log.id}
                  log={{
                    id: log.id,
                    timestamp: new Date(log.timestamp).toTimeString().split(' ')[0],
                    level: log.level === 'warning' ? 'warn' : log.level as 'info' | 'error',
                    message: log.message,
                  }}
                />
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
