import { createStackNavigator } from '@react-navigation/stack';

import { BudgetStackParamList } from '../../types/navigation.types.ts';
import Budget from "./BudgetScreen/BudgetScreen.tsx"
import AddBudgetPlan from "./AddBudgetPlan/AddBudgetPlan.tsx"
import AddBudgetPlanSecondScreen from "./AddBudgetPlanSecondScreen/AddBudgetPlanSecondScreen.tsx"
import AddBudgetPlanFinalScreen from "./AddBudgetPlanFinalScreen/AddBudgetPlanFinalScreen.tsx"
import BudgetPlanInfoScreen from "./BudgetPlanInfoScreen/BudgetPlanInfoScreen.tsx"
import CatygoryScreen from "./CatygoryScreen/CatygoryScreen.tsx"
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
      <BudgetStack.Screen name="AddBudgetPlanSecondScreen" component={AddBudgetPlanSecondScreen}/>
      <BudgetStack.Screen name='AddBudgetPlanFinalScreen' component={AddBudgetPlanFinalScreen}/>
      <BudgetStack.Screen name="AddBudgetPlan" component={AddBudgetPlan} />
      <BudgetStack.Screen name="BudgetPlanInfoScreen" component={BudgetPlanInfoScreen} />      
      <BudgetStack.Screen name="CatygoryScreen" component={CatygoryScreen} />      

    </BudgetStack.Navigator>
  );
}
export default BudgetStackScreen;
