import * as SecureStore from 'expo-secure-store';
// import { JwtPayload } from 'jwt-decode';
// 

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export const storeTokens = async ({accessToken, refreshToken}:Tokens) => {
  try {
    await SecureStore.setItemAsync('authData', JSON.stringify({
      accessToken,
      refreshToken
    }));
    return true;
  } catch (error) {
    console.error('Error storing tokens:', error);
    return false;
  }
};

export const getTokens = async () => {
  try {
    const authData = await SecureStore.getItemAsync('authData');
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync('authData');
    return true;
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return false;
  }
};