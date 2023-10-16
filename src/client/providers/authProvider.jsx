import { getLogout, postLogin } from '../api/services';
import { useMutation } from '@tanstack/react-query';

export const authProvider = {
  isAuthenticated: false,

  async login(email, password) {
    const response = await postLogin(email, password);
    console.log(`response: `, response);
    authProvider.isAuthenticated = response.data.isAuthenticated;
  },
  async logOut() {
    const response = await getLogout();
    console.log(`response: `, response);
    authProvider.isAuthenticated = response.data.isAuthenticated;
  },
};
