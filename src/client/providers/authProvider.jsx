import { getLogout, postLogin, postRegistration } from '../api/services';
import { useMutation } from '@tanstack/react-query';

export const authProvider = {
  isAuthenticated: false,

  async login(email, password) {
    const response = await postLogin(email, password);
    console.log(`response login: `, response);
    authProvider.isAuthenticated = response.data.isAuthenticated;
  },
  async logOut() {
    const response = await getLogout();
    console.log(`response logout: `, response);
    authProvider.isAuthenticated = response.data.isAuthenticated;
  },
  async register(email, password, confirm, name) {
    const response = await postRegistration(email, password, confirm, name);
    console.log(`response register: `, response);
    authProvider.isAuthenticated = response.data.isAuthenticated;
  },
};
