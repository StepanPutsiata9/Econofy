/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { store } from './store/store';
import { Provider } from 'react-redux';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View>
            <Text style={styles.econofyText1}>Econofy Medium</Text>
            <Text style={styles.econofyText2}>Econofy Bold</Text>
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  econofyText1: {
    fontSize: 24,
    fontFamily: 'Montserrat',
  },
  econofyText2: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    fontWeight: 700,
  },
});

export default App;
