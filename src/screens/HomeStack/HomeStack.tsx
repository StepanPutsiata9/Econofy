import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation.types.ts';
import Home from "./HomeScreen/HomeScreen.tsx";



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
