import db from '../utils/database.js';

export const create = (subtaskData) => {
  return db.subTask.create({
    data: {
      title: subtaskData.title,
      description: subtaskData.description,
      projectId: subtaskData.projectId,
      completed: false,
    },
  });
};

export const getAllByProjectId = (projectId) => {
  return db.subTask.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      timeRecords: true,
    },
  });
};

export const deleteById = (subtaskId) => {
  return db.subTask.delete({
    where: {
      id: subtaskId,
    },
  });
};

export const update = (subtaskData) => {
  return db.subTask.update({
    where: { id: subtaskData.subtaskId },
    data: {
      title: subtaskData.title || undefined,
      description: subtaskData.description || undefined,
      completed: subtaskData.completed,
      updatedAt: new Date(),
    },
  });
};

export const getById = (id) => {
  return db.subTask.findUnique({
    where: {
      id,
    },
    include: {
      timeRecords: true,
    },
  });
};
