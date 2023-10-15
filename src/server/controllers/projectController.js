import * as projectModel from '../models/projectModel.js';

const create = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400);
      throw new Error('You must provide a project title.');
    }

    const { userId } = req.payload;

    let project = await projectModel.create({ title, description, userId: userId });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      res.status(400);
      throw new Error('You must provide a project id.');
    }

    const { userId } = req.payload;
    // Validate project belongs to token user
    const projectToUpdate = await projectModel.findProjectById(projectId)
    if (projectToUpdate.creatorId != userId) {
      res.status(403);
      throw new Error('You do not have permission to delete this project.');
    }

    await projectModel.deleteById(projectId);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

const getAllUserProjects = async (req, res, next) => {
  try {
    const { userId } = req.payload;

    let projects = await projectModel.getAllByUserId(userId);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { title, description, projectId } = req.body;

    if (!projectId) {
      res.status(400);
      throw new Error('You must provide a project id.');
    }

    const { userId } = req.payload;
    // Validate project belongs to user 
    const projectToUpdate = await projectModel.findProjectById(projectId)
    if (projectToUpdate.creatorId != userId) {
      res.status(403);
      throw new Error('You do not have permission to update this project.');
    }

    let project = await projectModel.update({ title, description, projectId });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export { create, getAllUserProjects, deleteProject, update };