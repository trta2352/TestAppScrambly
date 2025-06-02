import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../presentation/screens/SplashScreen';
import HomeScreen from '../presentation/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from './RouteName';
import { RootStackParamList } from './NavigationTypes';
import { navigationRef } from './rootNavigation';

const Stack = createNativeStackNavigator<RootStackParamList, 'RootStack'>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName={RouteName.SplashScreen}
      id="RootStack"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}
