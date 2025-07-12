import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/ui/Header/Header.tsx';
import { styles } from './AuthScreen.ts';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { useState } from 'react';
import EyeClosed from '../../../components/SvgComponents/EyeClosed.tsx';
import EyeOpened from '../../../components/SvgComponents/EyeOpened.tsx';
import { useNavigation } from '@react-navigation/native';
import {
  AuthStackParamList,
  // RootStackParamList,
} from '../../../types/navigation.types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
function AuthScreen() {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');

  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.authText}>Войти</Text>
      <ScrollView>
        <View>
          <TextInput
            value={loginText}
            placeholder="Login"
            style={styles.loginInput}
            onChangeText={setLoginText}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <View style={styles.inputView}>
            <TextInput
              value={passwordText}
              placeholder="Пароль"
              style={styles.passwordInput}
              onChangeText={setPasswordText}
              placeholderTextColor="#fff"
              secureTextEntry={!isSecure}
            />
            <View style={styles.eye}>
              <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                {isSecure ? <EyeClosed /> : <EyeOpened />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            authNavigation.navigate('RegistrationScreen');
          }}
          style={styles.touchOpacity}
        >
          <Text style={styles.noAccountText}>
            Нет аккаунта? Зарегистрироваться
          </Text>
        </TouchableOpacity>
        <MainButton
          title="Войти"
          onClick={() => {
            authNavigation.navigate('LoadScreen');
            // rootNavigation.navigate('Home',{screen:"HomeScreen"})
          }}
        />
      </ScrollView>
    </View>
  );
}
export default AuthScreen;
