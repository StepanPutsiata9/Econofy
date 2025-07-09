import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { JSX, useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeTab from '../../SvgComponents/HomeTab.tsx';
import SettingsTab from '../../SvgComponents/SettingsTab.tsx';
import BudgetTab from '../../SvgComponents/BudgetTab.tsx';
import CurrencyTab from '../../SvgComponents/CurrencyTab.tsx';
import {styles} from "./Tabbar.ts"
function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element {
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index];
  const tabBarStyle = descriptors[currentRoute.key].options.tabBarStyle;
  const shouldHideTabBar =
    tabBarStyle && 'height' in tabBarStyle && tabBarStyle.height === 0;
  const animValues = useRef(
    state.routes.map(() => ({
      bgColor: new Animated.Value(0),
      scale: new Animated.Value(1),
    })),
  ).current;

  useEffect(() => {
    state.routes.forEach((_, index) => {
      Animated.timing(animValues[index].bgColor, {
        toValue: state.index === index ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.sequence([
        Animated.timing(animValues[index].scale, {
          toValue: state.index === index ? 1.05 : 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animValues[index].scale, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [animValues, state.index, state.routes]);

  if (shouldHideTabBar) {
    return <></>;
  }

  return (
    <View
      style={[
        {
          marginTop: insets.top,
          marginBottom: insets.bottom + 20,
        },
        styles.tabContainer,
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        let icon: JSX.Element = <Text>фотка</Text>;
        const title = options.title;

        const bgColor = animValues[index].bgColor.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(43, 43, 43, 0)', 'rgba(91, 255, 111, 1)'],
        });

        const scale = animValues[index].scale;

        switch (route.name) {
          case 'Home':
            icon = <HomeTab color={isFocused ? '#000' : '#fff'} />;
            break;
          case 'Settings':
            icon = <SettingsTab color={isFocused ? '#000' : '#fff'} />;
            break;
          case 'Budget':
            icon = <BudgetTab color={isFocused ? '#000' : '#fff'} />;
            break;
          case 'Currency':
            icon = <CurrencyTab color={isFocused ? '#000' : '#fff'} />;
            break;
          case "Auth":
            icon = <BudgetTab color={isFocused ? '#000' : '#fff'} />;
          }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (

          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tabButtonWrapper}
          >
            <Animated.View
              style={[
                styles.tabButton,
                {
                  backgroundColor: bgColor,
                  transform: [{ scale }],
                },
                isFocused && styles.activeTabButton,
              ]}
            >
              <View>{icon}</View>
              {!isFocused && <Text style={styles.tabText}>{title}</Text>}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;

