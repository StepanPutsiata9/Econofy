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
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store.ts';
import Load from '../../screens/LoadScreen/LoadScreen.tsx';
import { useEffect } from 'react';
import { loadUser } from '../../store/slices/AuthSlice/Auth.slice.ts';

const Tab = createBottomTabNavigator<RootStackParamList>();

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
  const { isLoadinng, user } = useSelector((state: RootState) => state.auth);
  const dispatch=useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());

  }, [dispatch]);
  if (isLoadinng) {
    return <Load />;
  }
  if (!user) {
    return <AuthTabs />;
  }
  if (user && !isLoadinng) {
    return <MainTabs />;
  }
}
export default Tabs;
