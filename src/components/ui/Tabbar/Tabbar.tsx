import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { JSX } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeTab from "../../SvgComponents/HomeTab.tsx";
import SettingsTab from "../../SvgComponents/SettingsTab.tsx"
import BudgetTab from "../../SvgComponents/BudgetTab.tsx"
import CurrencyTab from "../../SvgComponents/CurrencyTab.tsx"
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

  if (shouldHideTabBar) {
    return <></>; // Лучше возвращать `null`, чем `<></>`
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
        let icon: JSX.Element =<Text>фотка</Text>;
        const title:string|undefined=options.title;

        switch(options.title){
          case "Home":
            icon=<HomeTab color={"#fff"}/>
            break;
          case "Settings":
            icon=<SettingsTab color={"#fff"}/>
            break;
          case "Budget":
            icon =<BudgetTab color={"#fff"}/>
            break;
          case "Currency":
            icon =<CurrencyTab color={"#fff"}/>
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
            style={styles.tabButton}
          >
            <View>{icon}</View>
            <Text>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#2B2B2B',
    borderRadius: 16,
    marginHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});