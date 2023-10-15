import { axiosClient } from './axiosClient';

export const getUserProfile = async () => {
  return await axiosClient.get('/user/profile');
};

export const registration = ({ email, password, name, confirm }) => {
  return axiosClient.post('auth/register', { email, password, name, confirm });
};

export const login = ({ email, password }) => {
  return axiosClient.post('auth/login', { email, password });
};

export const logout = () => {
  return axiosClient.get('/auth/logout');
};
