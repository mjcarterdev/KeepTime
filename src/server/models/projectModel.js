import db from '../utils/database.js';

export const create = (projectData) => {
  return db.project.create({
    data: {
      title: projectData.title,
      description: projectData.description,
      creatorId: projectData.userId,
    },
  });
};

export const getAllByUserId = (userId) => {
  return db.project.findMany({
    where: {
      creatorId: userId,
    },
    include: {
      subTasks: true,
    },
  });
};

export const deleteById = (projectId) => {
  return db.project.delete({
    where: {
      id: projectId,
    },
  });
};

export const update = (projectData) => {
  return db.project.update({
    where: { id: projectData.projectId },
    data: {
      title: projectData.title || undefined,
      description: projectData.description || undefined,
      updatedAt: new Date(),
    },
  });
};

export const findProjectById = (id) => {
  return db.project.findUnique({
    where: {
      id,
    },
    include: {
      subTasks: true,
    },
  });
};
