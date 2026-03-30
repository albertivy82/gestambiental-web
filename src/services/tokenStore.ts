import { userData } from "./userStore";

export const storeToken = async (token: string) => {
  try {
    localStorage.setItem("token", token);
    await userData();
  } catch (error) {
    // console.log('Error storing token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch (error) {
    // console.log('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    // console.log('Error removing token:', error);
  }
};