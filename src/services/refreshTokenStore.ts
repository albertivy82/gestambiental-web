export const storeRefreshToken = async (refresh_token: string) => {
  try {
    localStorage.setItem('refresh_token', refresh_token);
  } catch (error) {
    console.log('Error storing refresh_token:', error);
  }
};

export const getRefreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    return refresh_token;
  } catch (error) {
    console.log('Error getting refresh_token:', error);
    return null;
  }
};

export const removeRefreshToken = async () => {
  try {
    localStorage.removeItem('refresh_token');
  } catch (error) {
    console.log('Error removing refresh_token:', error);
  }
};