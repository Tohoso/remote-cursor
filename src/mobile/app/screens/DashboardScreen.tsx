import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusIndicator } from '../../components/dashboard/StatusIndicator';
import { ProjectCard } from '../../components/dashboard/ProjectCard';
import { LogEntry } from '../../components/dashboard/LogEntry';
import { mockProjects, mockLogs } from '../../data/mockData';

export const DashboardScreen = () => {
  return (
    <View className="flex-1 bg-[#1a1a2e]">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            Remote Cursor
          </Text>
          <StatusIndicator status="connected" />
        </View>

        {/* Project Cards Section */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Active Projects
          </Text>
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>

        {/* Real-time Log Section */}
        <View className="mb-4">
          <Text className="text-white text-lg font-semibold mb-3">
            Real-time Logs
          </Text>
          <View className="bg-[#16213e] rounded-lg p-3">
            {mockLogs.map((log) => (
              <LogEntry key={log.id} log={log} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
