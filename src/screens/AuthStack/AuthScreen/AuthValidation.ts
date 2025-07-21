import axios from 'axios';
import {
  setLoading,
  setAuthError,
} from '../../../store/slices/AuthSlice/Auth.slice';
import { AppDispatch } from '../../../store/store';
export const checkError: any = (err: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(err)) {
    dispatch(setAuthError(
      err.response?.data?.message ||
        err.message ||
        'Произошла ошибка при входе',
    ));
  } else if (err instanceof Error) {
    dispatch(setAuthError(err.message || 'Произошла ошибка при входе'));
  } else {
    dispatch(setAuthError('Произошла неизвестная ошибка при входе'));
  }
};

export const errorMessage: any = () => {};

export const errorInputs: any = (
  loginText: string,
  passwordText: string,
  setLoginText: (text: string) => void,
  setPasswordText: (text: string) => void,
  dispatch: AppDispatch,
) => {
  if (loginText.trim().length === 0 || passwordText.trim().length === 0) {
    dispatch(setLoading(false));
    dispatch(setAuthError('Все поля должны быть заполненными'));
    setLoginText('');
    setPasswordText('');
    return false;
  }
  if (loginText.trim().length < 8 || passwordText.trim().length < 8) {
    dispatch(setLoading(false));
    dispatch(
      setAuthError('Логин и пароль должны состоять минимум из 8 символов'),
    );
    setLoginText('');
    setPasswordText('');
    return false;
  }
  return true;
};
