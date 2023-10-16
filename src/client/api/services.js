import { axiosClient } from './axiosClient';

export const getUserProfile = async () => {
  return await axiosClient.get('/user/profile');
};

export const postRegistration = ({ email, password, name, confirm }) => {
  return axiosClient.post('auth/register', { email, password, name, confirm });
};

export const postLogin = (email, password) => {
  return axiosClient.post('auth/login', email, password);
};

export const getLogout = () => {
  return axiosClient.get('/auth/logout');
};
