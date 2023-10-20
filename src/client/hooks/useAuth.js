import { client } from '../utils/axiosClient';

export const register = ({ email, password, name, confirm }) => {
  return client.post('auth/register', { email, password, name, confirm }, { authorization: false });
};

export const login = ({ email, password }) => {
  return client.post('auth/login', { email, password }, { authorization: false });
};

export const getProfile = () => {
  return client.get('/users/profile');
};
