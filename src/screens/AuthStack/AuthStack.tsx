import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from "./AuthScreen/AuthScreen.tsx"
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen.tsx"
import { AuthStackParamList } from '../../types/navigation.types.ts';


const AuthStack = createStackNavigator<AuthStackParamList>();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator  screenOptions={{
        headerShown: false,
      }} >
      <AuthStack.Screen name="AuthScreen" component={AuthScreen}  />
      <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}
export default AuthStackScreen;