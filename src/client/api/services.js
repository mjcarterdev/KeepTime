import { axiosClient } from './axiosClient';

export const getUserProfile = async () => {
  const res = await axiosClient.get('/user/profile');
  console.log('getUserProfile: ', res.data);
  return res.data;
};

export const postRegistration = ({ email, password, name, confirm }) => {
  return axiosClient.post('auth/register', { email, password, name, confirm });
};

export const postLogin = (data) => {
  return axiosClient.post('auth/login', data);
};

export const getLogout = () => {
  return axiosClient.get('/auth/logout');
};
