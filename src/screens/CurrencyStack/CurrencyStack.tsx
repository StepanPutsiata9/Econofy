import { createStackNavigator } from '@react-navigation/stack';

import { CurrencyStackParamList } from '../../types/navigation.types.ts';
import { Text, View } from 'react-native';
export function Currency() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Currency</Text>
    </View>
  );
}

const CurrencyStack = createStackNavigator<CurrencyStackParamList>();
function CurrencyStackScreen() {
  return (
    <CurrencyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CurrencyStack.Screen name="CurrencyScreen" component={Currency} />
    </CurrencyStack.Navigator>
  );
}
export default CurrencyStackScreen;
