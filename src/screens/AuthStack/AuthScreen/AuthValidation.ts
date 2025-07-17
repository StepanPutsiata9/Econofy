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
        'Произошла ошибка при входе',
    );
  } else if (err instanceof Error) {
    setError(err.message || 'Произошла ошибка при входе');
  } else {
    setError('Произошла неизвестная ошибка при входе');
  }
};

export const errorMessage: any = () => {};

export const errorInputs: any = (
  loginText: string,
  passwordText: string,
  setError: (text:string) => void,
  setLoginText:(text:string)=>void,
  setPasswordText:(text:string)=>void,
  dispatch:AppDispatch
) => {
  if (loginText.trim().length === 0 || passwordText.trim().length === 0) {
    dispatch(setLoading(false));
    setError('Все поля должны быть заполненными');
    setLoginText('');
    setPasswordText('');
    return false;
  }
  if (loginText.trim().length < 6 || passwordText.trim().length < 6) {
    dispatch(setLoading(false));
    setError('Логин и пароль должны состоять минимум из 6 символов');
    setLoginText('');
    setPasswordText('');
    return false;
  }
  return true;
};
