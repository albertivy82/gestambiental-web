
import { connectionAPIGet } from './connectionAPI';
import { UserBody } from '../types/userBody';
import { getToken } from './tokenStore';
import { jwtDecode } from 'jwt-decode';



export const userData = async () => {

  const token = await getToken();

  if (token) {

    const decodedToken: any = jwtDecode(token);
    const matricula = decodedToken["matricula"];

    const usuarioAtual = await connectionAPIGet<UserBody>(
      `api/usuario/buscapormatricula/${matricula}`
    );

    storeUser(usuarioAtual);

  } else {
    console.log('Token de autenticação não encontrado.');
  }
};

const storeUser = async (user: UserBody) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log('Error storing user:', error);
  }
};

export const getUser = async () => {
  try {
    const user = localStorage.getItem('user');
    return user;
  } catch (error) {
    console.log('Error getting User:', error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.log('Error removing informações do usuário:', error);
  }
};