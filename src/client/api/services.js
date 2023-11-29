import { axiosClient } from './axiosClient';

// User API functions
export const getUser = async () => {
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

export const deleteProjectById = (projectId) => {
  return axiosClient.delete(`project/delete/${projectId}`);
};

// Project API functions
export const postProject = (data) => {
  return axiosClient.post('project/createNew', data);
};

export const updateProjectById = ({ title, projectId, completed }) => {
  return axiosClient.put(`project/update/${projectId}`, { title, completed });
};

export const deleteProject = (projectId) => {
  return axiosClient.delete(`project/delete/${projectId}`);
};

// Subtask API functions
export const getAllSubtaskByProjectId = (id) => {
  return axiosClient.get(`subtask/getProjectSubtasks/${id}`);
};

export const getSubtaskById = (id) => {
  return axiosClient.get(`subtask/${id}`);
};

export const postSubtask = (data) => {
  return axiosClient.post(`subtask/createNew`, data);
};

export const updateSubtaskById = ({ title, id, description, completed }) => {
  return axiosClient.put(`subtask/update/${id}`, {
    title,
    description,
    completed,
  });
};

export const deleteSubtask = (subtaskId) => {
  return axiosClient.delete(`subtask/delete/${subtaskId}`);
};

// Time Record API functions
export const getAllTimeRecordsBySubtaskId = async (subtaskId) => {
  const timeRecords = await axiosClient.get(
    `timeRecord/allBySubtaskId/${subtaskId}`,
  );
  return timeRecords;
};

export const postTimeRecord = (data) => {
  return axiosClient.post(`timeRecord/create`, data);
};

export const startTimer = async (data) => {
  let response = await axiosClient.post(`timeRecord/start`, data);
  return response.data;
};

export const stopTimer = async (timeRecordId) => {
  await axiosClient.put(`timeRecord/stop/${timeRecordId}`);
};

export const updateTimeRecordById = ({ startTime, endTime, timeRecordId }) => {
  return axiosClient.put(`timeRecord/update/${timeRecordId}`, {
    startTime,
    endTime,
  });
};

export const deleteTimeRecordById = (timeRecordId) => {
  axiosClient.delete(`timeRecord/delete/${timeRecordId}`);
};
