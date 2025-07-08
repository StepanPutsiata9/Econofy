import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import AuthStack from '../../screens/AuthStack/AuthStack.tsx';
import SettingsStack from '../../screens/SettingsStack/SettingsStack.tsx';
import BudgetStack from '../../screens/BudgetStack/BudgetStack.tsx';
import CurrencyStack from '../../screens/CurrencyStack/CurrencyStack.tsx';
import HomeStack from "../../screens/HomeStack/HomeStack.tsx"
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
            tabBarLabel: 'Авторизация',
            title: 'Auth',
          } as BottomTabNavigationOptions
        }
      />
       <Tab.Screen
        name="Home"
        component={HomeStack}
        options={
          {
            // tabBarStyle: { height: 0 },
            tabBarLabel: 'Цели',
            title: 'Home',
          } as BottomTabNavigationOptions
        }
      />
      <Tab.Screen
        name="Currency"
        component={CurrencyStack}
        options={
          {
            tabBarLabel: 'Валюты',
            title: 'Currency',
          } as BottomTabNavigationOptions
        }
      />

      <Tab.Screen
        name="Budget"
        component={BudgetStack}
        options={
          {
            tabBarLabel: 'Бюджет',
            title: 'Budget',
          } as BottomTabNavigationOptions
        }
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={
          {
            tabBarLabel: 'Настройки',
            title: 'Settings',
          } as BottomTabNavigationOptions
        }
      />
    </Tab.Navigator>
  );
}
export default Tabs;
