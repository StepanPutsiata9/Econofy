import axios from 'axios';
import { setLoading } from '../../../store/slices/AuthSlice/Auth.slice';
import { AppDispatch } from '../../../store/store';
export const checkError: any = (
  err: unknown,
  setError: (err: unknown) => void,
) => {
  if (axios.isAxiosError(err)) {
    setError(
      err.response?.data?.message ||
        err.message ||
        'Произошла ошибка при регистрации',
    );
  } else if (err instanceof Error) {
    setError(err.message || 'Произошла ошибка при регистрации');
  } else {
    setError('Произошла неизвестная ошибка при регистрации');
  }
};

export const errorMessage: any = () => {};

export const errorInputs: any = (
  loginText: string,
  passwordText: string,
  repitPasswordText:string,
  setError: (text: string) => void,
  setLoginText: (text: string) => void,
  setPasswordText: (text: string) => void,
  setRepitPasswordText:(text:string)=>void,
  dispatch: AppDispatch,
) => {
    if (loginText.trim().length === 0 || passwordText.trim().length === 0|| repitPasswordText.trim().length === 0) {
      dispatch(setLoading(false));
      setError('Все поля должны быть заполненными');
      setLoginText('');
      setPasswordText('');
      setRepitPasswordText('');
      return false;
    }
    if (loginText.trim().length < 6 || passwordText.trim().length < 6) {
      dispatch(setLoading(false));
      setError('Логин и пароль должны состоять минимум из 6 символов');
      setLoginText('');
      setPasswordText('');
      setRepitPasswordText('');
      return false;
    }
    if (passwordText.trim() !== repitPasswordText.trim()) {
      dispatch(setLoading(false));
      setError('Пароли должны совпадать');
      setLoginText('');
      setPasswordText('');
      setRepitPasswordText('');
      return;
    }
  return true;
};
