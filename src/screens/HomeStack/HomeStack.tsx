import { createStackNavigator } from '@react-navigation/stack';

import { HomeStackParamList } from '../../types/navigation.types.ts';
import { Text, View } from 'react-native';
export function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

const HomeStack = createStackNavigator<HomeStackParamList>();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
}
export default HomeStackScreen;