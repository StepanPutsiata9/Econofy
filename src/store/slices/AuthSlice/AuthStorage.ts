import * as Keychain from 'react-native-keychain';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// Сохраняем токены в безопасное хранилище
export const storeTokens = async ({ accessToken, refreshToken }: Tokens): Promise<boolean> => {
  try {
    // Сохраняем accessToken как основной пароль
    await Keychain.setGenericPassword('accessToken', accessToken, {
      service: 'accessToken' // Уникальный идентификатор для accessToken
    });

    // Сохраняем refreshToken как отдельную запись
    await Keychain.setGenericPassword('refreshToken', refreshToken, {
      service: 'refreshToken' // Уникальный идентификатор для refreshToken
    });

    return true;
  } catch (error) {
    console.error('Error storing tokens:', error);
    return false;
  }
};

// Получаем сохраненные токены
export const getTokens = async (): Promise<Tokens | null> => {
  try {
    // Получаем accessToken
    const accessTokenCredentials = await Keychain.getGenericPassword({
      service: 'accessToken'
    });

    // Получаем refreshToken
    const refreshTokenCredentials = await Keychain.getGenericPassword({
      service: 'refreshToken'
    });

    if (accessTokenCredentials && refreshTokenCredentials) {
      return {
        accessToken: accessTokenCredentials.password,
        refreshToken: refreshTokenCredentials.password
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

// Удаляем сохраненные токены
export const clearTokens = async (): Promise<boolean> => {
  try {
    // Удаляем accessToken
    await Keychain.resetGenericPassword({ service: 'accessToken' });

    // Удаляем refreshToken
    await Keychain.resetGenericPassword({ service: 'refreshToken' });

    return true;
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return false;
  }
};