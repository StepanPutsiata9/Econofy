import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
// import Start from './screens/StartScreen/StartScreen.tsx';
// import Load from './screens/LoadScreen/LoadScreen.tsx';
// import AuthScreen from "./screens/AuthScreen/AuthScreen.tsx"
// import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen.tsx"
import { store } from './store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs/Tabs.tsx';
function App() {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor="transparent"
            translucent
          />
          <Tabs />
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
