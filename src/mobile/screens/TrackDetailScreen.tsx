import React from 'react';
import { View, Text } from 'react-native';
import { TrackDetailScreenProps } from '../navigation/types';
import { colors, typography } from '../theme';

export const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ route }) => {
  const { trackId } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...typography.h1 }}>トラック詳細</Text>
      <Text style={{ ...typography.body, color: colors.secondaryText }}>Track ID: {trackId}</Text>
      <Text style={{ ...typography.caption, color: colors.secondaryText, marginTop: 16 }}>
        TASK-016で実装予定
      </Text>
    </View>
  );
};
