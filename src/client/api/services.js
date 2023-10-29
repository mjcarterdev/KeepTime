import { axiosClient } from './axiosClient';

// User API functions
export const getUserProfile = async () => {
  const res = await axiosClient.get('/user/profile');
  return res.data;
};

// Auth API functions
export const postRegistration = ({ email, password, name, confirm }) => {
  return axiosClient.post('auth/register', { email, password, name, confirm });
};

export const postLogin = (data) => {
  return axiosClient.post('auth/login', data);
};

export const getLogout = () => {
  return axiosClient.get('auth/logout');
};

//Project API functions
export const getAllProjects = () => {
  return axiosClient.get('project/getUserProjects');
};

export const postProject = (data) => {
  return axiosClient.post('project/createNew', data);
};

export const updateProjectById = ({ title, description, projectId }) => {
  return axiosClient.put(`project/update/${projectId}`, { title, description });
};

export const deleteProjectById = (projectId) => {
  return axiosClient.delete(`project/delete/${projectId}`);
};

// Subtask API functions
export const getAllSubtaskByProjectId = (id) => {
  return axiosClient.get(`subtask/getProjectSubtasks/${id}`);
};

export const postSubtask = (data) => {
  return axiosClient.post(`subtask/createNew`, data);
};
