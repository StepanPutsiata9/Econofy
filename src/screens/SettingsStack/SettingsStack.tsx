import { createStackNavigator } from '@react-navigation/stack';

import { SettingsStackParamList } from '../../types/navigation.types.ts';
import Settings from "./SettingsScreen/SettingsScreen.tsx"


const SettingsStack = createStackNavigator<SettingsStackParamList>();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator  screenOptions={{
        headerShown: false,
      }} >
      <SettingsStack.Screen name="SettingsScreen" component={Settings}  />
    </SettingsStack.Navigator>
  );
}
export default SettingsStackScreen;