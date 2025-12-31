import React from 'react';
import { View, Text } from 'react-native';
import { BlockerDetailScreenProps } from '../navigation/types';
import { colors, typography } from '../theme';

export const BlockerDetailScreen: React.FC<BlockerDetailScreenProps> = ({ route }) => {
  const blockerId = route.params?.blockerId;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...typography.h1 }}>ブロッカー詳細</Text>
      {blockerId && (
        <Text style={{ ...typography.body, color: colors.secondaryText }}>Blocker ID: {blockerId}</Text>
      )}
      <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 16 }}>
        TASK-017で実装予定
      </Text>
    </View>
  );
};
