import db from '../utils/database.js';

const create = (projectData) => {
  return db.project.create({
    data: {
      title: projectData.title,
      description: projectData.description,
      creatorId: projectData.userId,
    },
  });
};

const getAllByUserId = (userId) => {
  return db.project.findMany({
    where: {
      creatorId: userId
    },
  });
};

const deleteById = (projectId) => {
  return db.project.delete({
    where: {
      id: projectId
    },
  });
};

const update = (projectData) => {
  return db.project.update({
    where: { id: projectData.projectId },
    data: {
      title: projectData.title || undefined,
      description: projectData.description || undefined,
      updatedAt: new Date()
    }
  });
};

const findProjectById = (id) => {
  return db.project.findUnique({
    where: {
      id,
    },
  });
};

export { create, getAllByUserId, deleteById, update, findProjectById };