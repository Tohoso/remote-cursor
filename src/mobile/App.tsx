import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
