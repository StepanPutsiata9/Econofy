import { createStackNavigator } from '@react-navigation/stack';

import { BudgetStackParamList } from '../../types/navigation.types.ts';
import Budget from "./BudgetScreen/BudgetScreen.tsx"


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
