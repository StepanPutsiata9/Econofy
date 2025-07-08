import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { JSX } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconName =
          route.name === 'Home'
            ? isFocused
              ? 'home'
              : 'home-outline'
            : route.name === 'Settings'
            ? isFocused
              ? 'settings'
              : 'settings-outline'
            : isFocused
            ? 'list'
            : 'list-outline'; // fallback icon

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#673ab7' : '#222'}
            />
            <Text
              style={{
                color: isFocused ? '#673ab7' : '#222',
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
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
    // marginBottom: 20,
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
