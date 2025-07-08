import { createStackNavigator } from '@react-navigation/stack';

import { BudgetStackParamList } from '../../types/navigation.types.ts';
import { Text, View } from 'react-native';
export function Budget() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Budget</Text>
    </View>
  );
}

const BudgetStack = createStackNavigator<BudgetStackParamList>();
function BudgetStackScreen() {
  return (
    <BudgetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BudgetStack.Screen name="BudgetScreen" component={Budget} />
    </BudgetStack.Navigator>
  );
}
export default BudgetStackScreen;
