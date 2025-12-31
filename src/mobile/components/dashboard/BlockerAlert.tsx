import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, typography } from '../../theme';

interface BlockerAlertProps {
  count: number;
}

/**
 * Blocker Alert Component
 *
 * Warning banner that appears when there are active blockers.
 * TODO: TASK-014 - Implement navigation to blocker detail screen
 */
export const BlockerAlert: React.FC<BlockerAlertProps> = ({ count }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.status.blocked,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      activeOpacity={0.7}
    >
      <View>
        <Text style={{ ...typography.h3, color: colors.primaryText }}>
          ⚠️ ブロッカー検出
        </Text>
        <Text style={{ ...typography.body, color: colors.primaryText, marginTop: 4 }}>
          {count}件のタスクがブロックされています
        </Text>
      </View>
      <Text style={{ ...typography.body, color: colors.primaryText }}>
        →
      </Text>
    </TouchableOpacity>
  );
};
