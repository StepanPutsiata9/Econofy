import {
  // ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  // KeyboardAvoidingView,
  // Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/ui/Header/Header.tsx';
import { styles } from './AuthScreen.ts';
import MainButton from '../../../components/ui/MainButton/MainButton.tsx';
import { useEffect, useRef, useState } from 'react';
import EyeClosed from '../../../components/SvgComponents/EyeClosed.tsx';
import EyeOpened from '../../../components/SvgComponents/EyeOpened.tsx';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../types/navigation.types.ts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  login,
  setAva,
  setAuthError,
} from '../../../store/slices/AuthSlice/Auth.slice.ts';
import api from '../../../store/slices/AuthSlice/api.ts';
import { RootState, useAppDispatch } from '../../../store/store.ts';
import { setLoading } from '../../../store/slices/AuthSlice/Auth.slice.ts';
import { checkError, errorInputs } from './AuthValidation.ts';
import { useSelector } from 'react-redux';
function AuthScreen() {
  const [isSecure, setIsSecure] = useState<boolean>(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const dispatch = useAppDispatch();
  const { authError } = useSelector((state: RootState) => state.auth);

  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (authError) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [fadeAnim, authError]);

  const setNullInputs = () => {
    setLoginText('');
    setPasswordText('');
  };
  const handleLogin = async () => {
    dispatch(setLoading(true));
    dispatch(setAuthError(null));
    if (
      !errorInputs(
        loginText,
        passwordText,
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
        dispatch(setAuthError('Неверный login или пароль'));
        return;
      }
      const { accessToken, refreshToken, uri } = response.data;
      if (accessToken && refreshToken) {
        await dispatch(login({ accessToken, refreshToken }));
        await dispatch(setAva(uri || null));
        setNullInputs();
      }
    } catch (err: unknown) {
      dispatch(setLoading(false));
      checkError(err, dispatch);
      setNullInputs();
    }
  };

  const setLogin = (text: string) => {
    if (text.length === 1) {
      dispatch(setAuthError(null));
    }
    setLoginText(text);
  };
  const setPassword = (text: string) => {
    if (text.length === 1) {
      dispatch(setAuthError(null));
    }
    setPasswordText(text);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.avoidView}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header />
          <Text style={styles.authText}>Войти</Text>
          <View>
            <TextInput
              value={loginText}
              placeholder="Логин"
              style={[styles.loginInput, authError && styles.errorInput]}
              onChangeText={setLogin}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9E9B9B"
            />
            <View style={styles.inputView}>
              <TextInput
                value={passwordText}
                placeholder="Пароль"
                style={[styles.passwordInput, authError && styles.errorInput]}
                onChangeText={setPassword}
                placeholderTextColor="#9E9B9B"
                secureTextEntry={!isSecure}
              />
              <View style={styles.eye}>
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                  {isSecure ? (
                    <EyeOpened color={authError ? '#FF1B44' : '#5BFF6F'} />
                  ) : (
                    <EyeClosed color={authError ? '#FF1B44' : '#5BFF6F'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {authError ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.errorText}>{authError}</Text>
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
export default AuthScreen;
