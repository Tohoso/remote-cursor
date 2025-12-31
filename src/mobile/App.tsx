import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';
import { RootStackParamList } from './navigation/types';
import { TrackDetailScreen } from './screens/TrackDetailScreen';
import { BlockerDetailScreen } from './screens/BlockerDetailScreen';
import { ActivityLogScreen } from './screens/ActivityLogScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackDetail"
          component={TrackDetailScreen}
          options={{ title: 'トラック詳細' }}
        />
        <Stack.Screen
          name="BlockerDetail"
          component={BlockerDetailScreen}
          options={{ title: 'ブロッカー詳細' }}
        />
        <Stack.Screen
          name="ActivityLog"
          component={ActivityLogScreen}
          options={{ title: 'アクティビティログ' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
