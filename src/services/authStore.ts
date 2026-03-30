import { DataType } from '../types/DataType';
import { storeRefreshToken } from './refreshTokenStore';
import { storeToken } from './tokenStore';


export const storeAuthData = async (data: DataType) => {
  try {
    localStorage.setItem('authData', JSON.stringify(data));
    await storeToken(data.access_token);
    await storeRefreshToken(data.refresh_token);
  } catch (error) {
    console.log('Error storing auth data:', error);
  }
};

export const getAuthData = async (): Promise<DataType | null> => {
  try {
    const data = localStorage.getItem('authData');

    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting auth data:', error);
    return null;
  }
};

export const removeAuthData = async () => {
  try {
    localStorage.removeItem('authData');
  } catch (error) {
    console.log('Error removing auth data:', error);
  }
};