import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Header from '../../../components/ui/Header/Header.tsx';
import { styles } from './AuthScreen.ts';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { useEffect, useRef, useState } from 'react';
import EyeClosed from '../../../components/SvgComponents/EyeClosed.tsx';
import EyeOpened from '../../../components/SvgComponents/EyeOpened.tsx';
import { useNavigation } from '@react-navigation/native';
import {
  AuthStackParamList,
} from '../../../types/navigation.types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootState, useAppDispatch } from '../../../store/store.ts';
// import { useSelector } from 'react-redux';
// import { login } from '../../../store/slices/AuthSlice/Auth.slice.ts';


function AuthScreen() {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // const { user,isLoadinng} = useSelector(
  //   (state: RootState) => state.auth,
  // );
  // const dispatch = useAppDispatch();


  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [error, fadeAnim]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    if (loginText.trim().length === 0 || passwordText.trim().length === 0) {
      setError('Все поля должны быть заполненными');
      setLoginText('');
      setPasswordText('');
      setLoading(false);
      return;
    }
    if (loginText.trim().length <= 6 || passwordText.trim().length <= 6) {
      setError('Логин и пароль должны состоять минимум из 6 символов');
      setLoginText('');
      setPasswordText('');
      setLoading(false);
      return;
    }
    try {
      // const response = await api.post('/login', {
      //   username: loginText,
      //   password: passwordText
      // });
      // const { accessToken, refreshToken } = response.data;
      // if (!accessToken  !refreshToken) {
      //   throw new Error('Не получили токены от сервера');
      // }
      // await login({accessToken, refreshToken});
    } catch (err) {
      // setError(
      //   err.response?.data?.message
      //   err.message ||
      //   'Произошла ошибка при входе'
      // );
      // setLoginText('');
      // setPasswordText('');
    } finally {
      setLoading(false);
    }
  };
  const setLogin = (text: string) => {
    setLoginText(text);
    setError('');
  };
  const setPassword = (text: string) => {
    setPasswordText(text);
    setError('');
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.authText}>Войти</Text>
      <ScrollView>
        <View>
          <TextInput
            value={loginText}
            placeholder="Login"
            style={[styles.loginInput, error && styles.errorInput]}
            onChangeText={setLogin}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <View style={styles.inputView}>
            <TextInput
              value={passwordText}
              placeholder="Пароль"
              style={[styles.passwordInput, error && styles.errorInput]}
              onChangeText={setPassword}
              placeholderTextColor="#fff"
              secureTextEntry={!isSecure}
            />
            <View style={styles.eye}>
              <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                {isSecure ? (
                  <EyeClosed color={error ? '#FF1B44' : '#5BFF6F'} />
                ) : (
                  <EyeOpened color={error ? '#FF1B44' : '#5BFF6F'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {error ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}
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
        {!loading ? (
          <MainButton
            title="Войти"
            onClick={handleLogin}
          />
        ) : (
          <ActivityIndicator size={30} color={'#5BFF6F'} />
        )}
      </ScrollView>
    </View>
  );
}
export default AuthScreen;
