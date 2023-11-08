import * as projectModel from '../models/projectModel.js';

export const create = async (req, res, next) => {
  /* 
    #swagger.tags = ['Project']
    #swagger.summary = 'Create a new project'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ error: 'You must provide a project title.' });
    }

    const { user } = req.cookies['jwt'];

    let project = await projectModel.create({
      title,
      description,
      userId: user.id,
    });
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project creation',
    });
  }
};

export const deleteProject = async (req, res, next) => {
  /* 
    #swagger.tags = ['Project']
    #swagger.summary = 'Delete a project by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const projectId = req.params.id;
    if (!projectId) {
      res.status(400).json({ error: 'You must provide a project id.' });
    }

    const { user } = req.cookies['jwt'];
    // Validate project belongs to token user
    const project = await projectModel.findProjectById(projectId);
    if (project.creatorId != user.id) {
      res
        .status(403)
        .json({ error: 'You do not have permission to delete this project.' });
    }

    await projectModel.deleteById(projectId);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project deletion',
    });
  }
};

export const getAllUserProjects = async (req, res, next) => {
  try {
    const { user } = req.cookies['jwt'];

    let projects = await projectModel.getAllByUserId(user.id);
    res.json(projects);
  } catch (error) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project getAllProjects',
    });
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    let project = await projectModel.findProjectById(projectId);
    res.status(200).json(project);
  } catch (err) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project getProjectById',
    });
  }
};

export const update = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const projectId = req.params.id;

    if (!projectId) {
      res.status(400).json({ error: 'You must provide a project id.' });
    }

    const { user } = req.cookies['jwt'];
    // Validate project belongs to user
    const projectToUpdate = await projectModel.findProjectById(projectId);
    if (projectToUpdate.creatorId != user.id) {
      res
        .status(403)
        .json({ error: 'You do not have permission to update this project.' });
    }

    let project = await projectModel.update({ title, description, projectId });
    res.status(200).json(project);
  } catch (err) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project update',
    });
  }
};
