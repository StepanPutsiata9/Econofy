import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation.types.ts';
import Home from './HomeScreen/HomeScreen.tsx';
import AddGoalScreen from './AddGoalScreen/AddGoalScreen.tsx';

const HomeStack = createStackNavigator<HomeStackParamList>();
function HomeStackScreen() {
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation:'fade_from_bottom'
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen
        name="AddGoalScreen"
        component={AddGoalScreen}
        options={{ headerShown: false }} 
      />
    </HomeStack.Navigator>
  );
}
export default HomeStackScreen;
