import { createStackNavigator } from '@react-navigation/stack';
import { CurrencyStackParamList } from '../../types/navigation.types.ts';
import CurrencyScreen from "./CurrencyScreen/CurrencyScreen.tsx"


const CurrencyStack = createStackNavigator<CurrencyStackParamList>();
function CurrencyStackScreen() {
  return (
    <CurrencyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CurrencyStack.Screen name="CurrencyScreen" component={CurrencyScreen} />
    </CurrencyStack.Navigator>
  );
}
export default CurrencyStackScreen;
