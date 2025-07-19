import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ImageSourcePropType } from 'react-native';
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
  avatar: string | null, 
): Promise<boolean> => {
  try {
    if (avatar === null || avatar === undefined) {
      console.log("avatar ",avatar);
      await AsyncStorage.removeItem('avatar'); 
    } else {
      await AsyncStorage.setItem('avatar', JSON.stringify(avatar));
      console.log("avatar not ",avatar);

    }
    return true;
  } catch (error) {
    console.error('Error storing avatar', error);
    return false;
  }
};

export const getAvatar = async (): Promise<string | null> => {
  try {
    const storedData = await AsyncStorage.getItem('avatar');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error reading avatar', error);
    return null;
  }
};