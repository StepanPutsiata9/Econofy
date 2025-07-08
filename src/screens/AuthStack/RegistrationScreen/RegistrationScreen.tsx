import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/ui/Header/Header.tsx';
import { styles } from './RegistrationScreen.ts';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import EyeClosed from '../../../components/SvgComponents/EyeClosed.tsx';
import EyeOpened from '../../../components/SvgComponents/EyeOpened.tsx';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation.types.ts';
import { useNavigation } from '@react-navigation/native';
function RegistrationScreen() {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [repitPasswordText, setRepitPasswordText] = useState<string>('');
  const [isSecureRepit, setIsSecureRepit] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.authText}>Регистрация</Text>
      <ScrollView>
        <View>
          <TextInput
            value={loginText}
            placeholder="Login"
            style={styles.input}
            onChangeText={setLoginText}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <View style={styles.inputView}>
            <TextInput
              value={passwordText}
              placeholder="Пароль"
              style={styles.input}
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
          <View style={styles.inputView}>
            <TextInput
              value={repitPasswordText}
              placeholder="Повторите пароль"
              style={styles.repitPasswordInput}
              onChangeText={setRepitPasswordText}
              placeholderTextColor="#fff"
              secureTextEntry={!isSecureRepit}
            />
            <View style={styles.eye}>
              <TouchableOpacity
                onPress={() => setIsSecureRepit(!isSecureRepit)}
              >
                {isSecureRepit ? <EyeClosed /> : <EyeOpened />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate("AuthScreen")}} style={styles.touchOpacity}>
          <Text style={styles.noAccountText}>Есть аккаунт? Войти</Text>
        </TouchableOpacity>
        <MainButton title="Зарегистрироваться" onClick={() => {}} />
      </ScrollView>
    </View>
  );
}
export default RegistrationScreen;
