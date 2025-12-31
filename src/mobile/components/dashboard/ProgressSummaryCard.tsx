import React from 'react';
import { View, Text } from 'react-native';
import { colors, typography } from '../../theme';

interface ProgressSummaryCardProps {
  completed: number;
  total: number;
}

/**
 * Progress Summary Card Component
 *
 * Displays overall project progress with a circular progress indicator.
 * TODO: TASK-014 - Implement circular progress chart using react-native-circular-progress
 */
export const ProgressSummaryCard: React.FC<ProgressSummaryCardProps> = ({
  completed,
  total
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <Text style={{ ...typography.h2, marginBottom: 12 }}>
        全体進捗
      </Text>

      {/* TODO: Replace with circular progress chart */}
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 48, fontWeight: '700', color: colors.accent }}>
          {percentage}%
        </Text>
        <Text style={{ ...typography.body, color: colors.secondaryText, marginTop: 8 }}>
          {completed} / {total} タスク完了
        </Text>
      </View>
    </View>
  );
};
