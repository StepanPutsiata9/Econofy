import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../../types/navigation.types.ts';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

export function Home() {
  const { ava } = useSelector((state: RootState) => state.auth);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <Text>Home</Text>
      {ava ? (
        <Image
          source={ava}
          style={{
            width: 96,
            height: 96,
            borderRadius: 75,
          }}
        />
      ) : (
        <Text>Авы пока что нет</Text>
      )}
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
