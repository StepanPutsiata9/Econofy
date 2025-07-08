import { SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  // useColorScheme,
} from 'react-native';
// import Start from './screens/StartScreen/StartScreen.tsx';
// import Load from './screens/LoadScreen/LoadScreen.tsx';
import AuthScreen from "./screens/AuthScreen/AuthScreen.tsx"
// import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen.tsx"
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent
        />
          {/* <Start /> */}
          {/* <Load/> */}
          <AuthScreen/>
          {/* <RegistrationScreen/> */}
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
