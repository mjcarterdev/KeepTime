import * as projectModel from '../models/projectModel.js';
import { totalDurationString } from '../utils/timeUtil.js';

export const create = async (req, res, next) => {
  /* 
    #swagger.tags = ['Project']
    #swagger.summary = 'Create a new project'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'You must provide a project title.' });
    }

    const { userId } = req.payload;

    let project = await projectModel.create({ title, description, userId: userId });
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    next(err);
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
      return res.status(400).json({ error: 'You must provide a project id.' });
    }

    const { userId } = req.payload;
    // Validate project belongs to token user
    const project = await projectModel.findProjectById(projectId);
    if (project.creatorId != userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this project.' });
    }

    await projectModel.deleteById(projectId);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

export const getAllUserProjects = async (req, res, next) => {
  /* 
    #swagger.tags = ['Project']
    #swagger.summary = 'Get all project for authorized user'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { userId } = req.payload;

    let projects = await projectModel.getAllByUserId(userId);
    let projectsWithDuration = projects.map((project) => {
      Object.assign(project, { totalDuration: totalDurationString(project.timeRecords) });
      delete project.timeRecords;
      return project;
    });
    res.json(projectsWithDuration);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  /* 
    #swagger.tags = ['Project']
    #swagger.summary = 'Get project by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const projectId = req.params.id;

    let project = await projectModel.findProjectById(projectId);
    project.totalDuration = totalDurationString(project.timeRecords);
    delete project.timeRecords;
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  /* 
    #swagger.tags = ['Project']
    #swagger.summary = 'Update a project data'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { title, description } = req.body;
    const projectId = req.params.id;

    if (!projectId) {
      res.status(400).json({ error: 'You must provide a project id.' });
    }

    const { userId } = req.payload;
    // Validate project belongs to user
    const projectToUpdate = await projectModel.findProjectById(projectId);
    if (projectToUpdate.creatorId != userId) {
      res.status(403).json({ error: 'You do not have permission to update this project.' });
    }

    let project = await projectModel.update({ title, description, projectId });
    res.json(project);
  } catch (err) {
    next(err);
  }
};
