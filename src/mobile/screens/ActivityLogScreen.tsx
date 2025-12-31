import React from 'react';
import { View, Text } from 'react-native';
import { colors, typography } from '../theme';

export const ActivityLogScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...typography.h1 }}>アクティビティログ</Text>
      <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 16 }}>
        TASK-018で実装予定
      </Text>
    </View>
  );
};
