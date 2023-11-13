import { getLogout, postLogin, postRegistration } from '../api/services';

const localStorageKey = 'keeptime-session';

const authProvider = {
  isAuth: false,
  user: null,
  getSession: () => {
    const res = localStorage.getItem(localStorageKey);
    if (!res) {
      return false;
    }
    const session = JSON.parse(res);
    authProvider.isAuth = session.isAuth;
    authProvider.user = session.user;
  },
  login: async (data) => {
    const res = await postLogin(data);
    if (res.status == 200) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          isAuth: res.data.isAuthenticated,
          user: res.data.user,
        }),
      );
      authProvider.getSession();
    }
    return res;
  },
  logout: async () => {
    const res = await getLogout();
    if (res.status == '200') {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ isAuth: false, user: {} }),
      );
      authProvider.getSession();
    }
    return res;
  },
  register: async (data) => {
    const res = await postRegistration(data);
    if (res.status == '200') {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          isAuth: res.data.isAuthenticated,
          user: res.data.user,
        }),
      );
      authProvider.getSession();
    }
    return res;
  },
};

export default authProvider;
