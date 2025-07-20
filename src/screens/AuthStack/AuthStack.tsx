import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './AuthScreen/AuthScreen.tsx';
import RegistrationScreen from './RegistrationScreen/RegistrationScreen.tsx';
import { AuthStackParamList } from '../../types/navigation.types.ts';
import StartScreen from '../StartScreen/StartScreen.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackScreen() {
  const { isFirstLaunch } = useSelector((state: RootState) => state.auth);

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isFirstLaunch ? (
        <>
          <AuthStack.Screen name="StartScreen" component={StartScreen} />
          <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
        </>
      ) : (
        <>
          <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
          <AuthStack.Screen name="StartScreen" component={StartScreen} />
        </>
      )}
      <AuthStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  );
}
export default AuthStackScreen;
