import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/ui/Header/Header.tsx';
import { styles } from './AuthScreen.ts';
import MainButton from "../../components/ui/MainButton/MainButton.tsx"
function AuthScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.authText}>Войти</Text>
      <ScrollView>
        <View>
          <TextInput
            // value={loginInput}
            placeholder="Login"
            style={styles.loginInput}
            // onChangeText={setLoginInput}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <TextInput
            // value={loginInput}
            placeholder="Password"
            style={styles.passwordInput}
            // onChangeText={setLoginInput}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.touchOpacity}
        >
            <Text style={styles.noAccountText}>
              Нет аккаунта? Зарегистрироваться
            </Text>
        </TouchableOpacity>
        <MainButton title='Войти' onClick={()=>{}}/>
      </ScrollView>
    </View>
  );
}
export default AuthScreen;
