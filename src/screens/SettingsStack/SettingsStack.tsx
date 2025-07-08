import { createStackNavigator } from '@react-navigation/stack';

import { SettingsStackParamList } from '../../types/navigation.types.ts';
import { Text, View } from 'react-native';
export function Settings(){
    return(
        <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    }}>
            <Text>Settings</Text>
        </View>
    )
}

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