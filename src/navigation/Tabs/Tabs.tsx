import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import AuthStack from '../../screens/AuthStack/AuthStack.tsx';
import SettingsStack from '../../screens/SettingsStack/SettingsStack.tsx';
import BudgetStack from '../../screens/BudgetStack/BudgetStack.tsx';
import CurrencyStack from '../../screens/CurrencyStack/CurrencyStack.tsx';
import HomeStack from '../../screens/HomeStack/HomeStack.tsx';
import { RootStackParamList } from '../../types/navigation.types.ts';
import CustomTabBar from '../../components/ui/Tabbar/Tabbar.tsx';

const Tab = createBottomTabNavigator<RootStackParamList>();
const isAuth: boolean = true;

function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Tab.Screen
        name="Auth"
        component={AuthStack}
        options={
          {
            tabBarStyle: { display: 'none' },
            title: 'Авторизация',
          } as BottomTabNavigationOptions
        }
      />
    </Tab.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={
          {
            title: 'Главная',
          } as BottomTabNavigationOptions
        }
      />

      <Tab.Screen
        name="Currency"
        component={CurrencyStack}
        options={
          {
            title: 'Валюты',
          } as BottomTabNavigationOptions
        }
      />

      <Tab.Screen
        name="Budget"
        component={BudgetStack}
        options={
          {
            title: 'Бюджет',
          } as BottomTabNavigationOptions
        }
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={
          {
            title: 'Настройки',
          } as BottomTabNavigationOptions
        }
      />
    </Tab.Navigator>
  );
}
function Tabs() {
  return <>{isAuth ? <MainTabs /> : <AuthTabs />}</>;
}
export default Tabs;
