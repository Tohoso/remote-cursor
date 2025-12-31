import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Track } from '@common/types';
import { colors, typography } from '../../theme';

interface TrackCardProps {
  track: Track;
}

/**
 * Track Card Component
 *
 * Displays summary information for a single development track.
 * TODO: TASK-014 - Implement progress bar, task preview list, and navigation to detail screen
 */
export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const statusColors = {
    active: colors.status.success,
    paused: colors.status.inProgress,
    completed: colors.status.success,
  };

  const statusLabels = {
    active: 'アクティブ',
    paused: '一時停止',
    completed: '完了',
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
      activeOpacity={0.7}
    >
      {/* Track Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ ...typography.h2 }}>
          {track.name}
        </Text>
        <View
          style={{
            backgroundColor: statusColors[track.status],
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text style={{ ...typography.caption, color: colors.background }}>
            {statusLabels[track.status]}
          </Text>
        </View>
      </View>

      {/* Track Info */}
      <Text style={{ ...typography.label, color: colors.secondaryText, marginBottom: 8 }}>
        担当: {track.agent}
      </Text>

      {/* Progress Bar - Placeholder */}
      <View style={{ marginBottom: 12 }}>
        <View
          style={{
            height: 8,
            backgroundColor: colors.border,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${track.progress}%`,
              height: '100%',
              backgroundColor: colors.accent,
            }}
          />
        </View>
        <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 4 }}>
          {track.completedTasks} / {track.totalTasks} タスク完了
        </Text>
      </View>

      {/* TODO: Add task preview list */}
    </TouchableOpacity>
  );
};
