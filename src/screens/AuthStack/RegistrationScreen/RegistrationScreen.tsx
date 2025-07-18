import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Header from '../../../components/ui/Header/Header.tsx';
import { styles } from './RegistrationScreen.ts';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import EyeClosed from '../../../components/SvgComponents/EyeClosed.tsx';
import EyeOpened from '../../../components/SvgComponents/EyeOpened.tsx';
import { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation.types.ts';
import { useNavigation } from '@react-navigation/native';
import { login, setAva } from '../../../store/slices/AuthSlice/Auth.slice.ts';
import api from '../../../store/slices/AuthSlice/api.ts';
import { useAppDispatch } from '../../../store/store.ts';
import { setLoading } from '../../../store/slices/AuthSlice/Auth.slice.ts';
import { checkError, errorInputs } from './RegistrationValidation.ts';
function RegistrationScreen() {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [repitPasswordText, setRepitPasswordText] = useState<string>('');
  const [isSecureRepit, setIsSecureRepit] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const dispatch = useAppDispatch();
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
    setRepitPasswordText('');
  };
  const handleRegistration = async () => {
    dispatch(setLoading(true));
    setError('');
    if (
      !errorInputs(
        loginText,
        passwordText,
        repitPasswordText,
        setError,
        setLoginText,
        setPasswordText,
        setRepitPasswordText,
        dispatch,
      )
    ) {
      return;
    }
    try {
      const response = await api.post('auth/registration', {
        login: loginText,
        password: passwordText,
      });
      const { accessToken, refreshToken } = response.data;
      await dispatch(login({ accessToken, refreshToken }));
      dispatch(setAva(null));
      setNullInputs();
    } catch (err: unknown) {
      checkError();
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
  const setRepitPassword = (text: string) => {
    setRepitPasswordText(text);
    setError('');
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.authText}>Регистрация</Text>
      <ScrollView>
        <View>
          <TextInput
            value={loginText}
            placeholder="Login"
            style={[styles.input, error && styles.errorInput]}
            onChangeText={setLogin}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <View style={styles.inputView}>
            <TextInput
              value={passwordText}
              placeholder="Пароль"
              style={[styles.input, error && styles.errorInput]}
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
          <View style={styles.inputView}>
            <TextInput
              value={repitPasswordText}
              placeholder="Повторите пароль"
              style={[styles.repitPasswordInput, error && styles.errorInput]}
              onChangeText={setRepitPassword}
              placeholderTextColor="#fff"
              secureTextEntry={!isSecureRepit}
            />
            <View style={styles.eye}>
              <TouchableOpacity
                onPress={() => setIsSecureRepit(!isSecureRepit)}
              >
                {isSecureRepit ? (
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
            authNavigation.navigate('AuthScreen');
          }}
          style={styles.touchOpacity}
        >
          <Text style={styles.noAccountText}>Есть аккаунт? Войти</Text>
        </TouchableOpacity>
        <MainButton title="Зарегистрироваться" onClick={handleRegistration} />
      </ScrollView>
    </View>
  );
}
export default RegistrationScreen;
