import { SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  // StyleSheet,
  useColorScheme,
} from 'react-native';
// import Start from './screens/StartScreen/StartScreen.tsx';
import Load from './screens/LoadScreen/LoadScreen.tsx';

import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
          {/* <Start /> */}
          <Load/>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
