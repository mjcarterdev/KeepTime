import { getLogout, postLogin, postRegistration } from '../api/services';

const localStorageKey = 'keeptime-session';

const getSession = () => {
  const res = localStorage.getItem(localStorageKey);
  if (!res) {
    return false;
  }
  const session = JSON.parse(res);
  return session;
};

const authContext = {
  session: () => getSession(),
  login: async (data) => {
    const res = await postLogin(data);
    console.log(res);

    if (res.status == '200') {
      localStorage.setItem(localStorageKey, JSON.stringify({ isAuth: res.data.isAuthenticated, user: res.data.user }));
    }
    return res;
  },
  logout: async () => {
    const res = await getLogout();
    if (res.status == '200') {
      localStorage.setItem(localStorageKey, JSON.stringify({ isAuth: false, user: {} }));
    }
    return res;
  },
  register: async (data) => {
    const res = await postRegistration(data);
    if (res.status == '200') {
      localStorage.setItem(localStorageKey, JSON.stringify({ isAuth: res.data.isAuthenticated, user: res.data.user }));
    }
    return res;
  },
};

export default authContext;
