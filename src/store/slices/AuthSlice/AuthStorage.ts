import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';
import * as Keychain from 'react-native-keychain';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const storeTokens = async ({
  accessToken,
  refreshToken,
}: Tokens): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword('accessToken', accessToken, {
      service: 'accessToken',
    });

    await Keychain.setGenericPassword('refreshToken', refreshToken, {
      service: 'refreshToken',
    });
    return true;
  } catch (error) {
    console.error('Error storing tokens:', error);
    return false;
  }
};
export const getTokens = async (): Promise<Tokens | null> => {
  try {
    const accessTokenCredentials = await Keychain.getGenericPassword({
      service: 'accessToken',
    });

    const refreshTokenCredentials = await Keychain.getGenericPassword({
      service: 'refreshToken',
    });

    if (accessTokenCredentials && refreshTokenCredentials) {
      return {
        accessToken: accessTokenCredentials.password,
        refreshToken: refreshTokenCredentials.password,
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

export const clearTokens = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword({ service: 'accessToken' });

    await Keychain.resetGenericPassword({ service: 'refreshToken' });

    return true;
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return false;
  }
};

export const storeAvatar = async (
  avatar: ImageSourcePropType|null,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('avatar', JSON.stringify(avatar));
    return true;
  } catch (error) {
    console.error('Error storing avatar', error);
    return false;
  }
};

export const getAvatar = async (): Promise<ImageSourcePropType|null> => {
  const storedData = await AsyncStorage.getItem('avatar');
  const parsedImageSource = storedData ? JSON.parse(storedData) : null;
  return parsedImageSource;
};
