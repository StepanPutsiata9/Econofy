import { createStackNavigator } from '@react-navigation/stack';

import { BudgetStackParamList } from '../../types/navigation.types.ts';
import Budget from "./BudgetScreen/BudgetScreen.tsx"
import AddBudgetPlan from "./AddBudgetPlan/AddBudgetPlan.tsx"

const BudgetStack = createStackNavigator<BudgetStackParamList>();
function BudgetStackScreen() {
  return (
    <BudgetStack.Navigator
      screenOptions={{
        headerShown: false,
        animation:'fade_from_bottom',
      }}
    >
      <BudgetStack.Screen name="BudgetScreen" component={Budget} />
      <BudgetStack.Screen name="AddBudgetPlan" component={AddBudgetPlan} />

    </BudgetStack.Navigator>
  );
}
export default BudgetStackScreen;
