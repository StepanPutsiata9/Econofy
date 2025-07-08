import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import AuthStack from '../../screens/AuthStack/AuthStack.tsx';
import { RootStackParamList } from '../../types/navigation.types.ts';
import CustomTabBar from '../../components/ui/Tabbar/Tabbar.tsx';

const Tab = createBottomTabNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Tab.Screen
        name="Auth"
        component={AuthStack}
        options={
          {
        // tabBarStyle: { height: 0 },
          } as BottomTabNavigationOptions
        }
      />
    </Tab.Navigator>
  );
}
export default Tabs;
