import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import Header from '../../../components/ui/Header/Header.tsx';
import { styles } from './AuthScreen.ts';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { useEffect, useRef, useState } from 'react';
import EyeClosed from '../../../components/SvgComponents/EyeClosed.tsx';
import EyeOpened from '../../../components/SvgComponents/EyeOpened.tsx';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation.types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login, setAva } from '../../../store/slices/AuthSlice/Auth.slice.ts';
import api from '../../../store/slices/AuthSlice/api.ts';
import { useAppDispatch } from '../../../store/store.ts';
import { setLoading } from '../../../store/slices/AuthSlice/Auth.slice.ts';
import { checkError, errorInputs } from './AuthValidation.ts';
function AuthScreen() {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
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

  const setNullInputs = () => {
    setLoginText('');
    setPasswordText('');
  };
  const handleLogin = async () => {
    dispatch(setLoading(true));
    setError('');
    if (
      !errorInputs(
        loginText,
        passwordText,
        setError,
        setLoginText,
        setPasswordText,
        dispatch,
      )
    ) {
      return;
    }
    try {
      const response = await api.post('auth/login', {
        login: loginText,
        password: passwordText,
      });
      if (response.data === null) {
        dispatch(setLoading(false));
        Alert.alert('Пользователь не найден');
        return;
      }
      const { accessToken, refreshToken, uri } = response.data;

      await dispatch(login({ accessToken, refreshToken }));
      console.log('avatar from api ', uri);
      await dispatch(setAva(uri || null));
      setNullInputs();
    } catch (err: unknown) {
      dispatch(setLoading(false));
      checkError(err, setError);
      setNullInputs();
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
        <MainButton title="Войти" onClick={handleLogin} />
      </ScrollView>
    </View>
  );
}
export default AuthScreen;
