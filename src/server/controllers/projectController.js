import * as projectModel from '../models/projectModel.js';
import { totalDurationString } from '../utils/timeUtil.js';

export const create = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ error: 'You must provide a project title.' });
    }

    const { user } = req.cookies['jwt'];

    let project = await projectModel.create({
      title,
      userId: user.id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project creation',
    });
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({ error: 'You must provide a project id.' });
    }

    const { user } = req.cookies['jwt'];
    // Validate project belongs to token user
    const project = await projectModel.findProjectById(projectId);
    if (project.creatorId != user.id) {
      return res
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
    let projectsWithDuration = projects.map((project) => {
      Object.assign(project, {
        totalDuration: totalDurationString(project.timeRecords),
      });
      delete project.timeRecords;
      return project;
    });
    res.json(projectsWithDuration);
  } catch (err) {
    res.status(403).json({
      error: err,
      message: 'Unexpected error in project getProjectById',
    });
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    let project = await projectModel.findProjectById(projectId);
    project.totalDuration = totalDurationString(project.timeRecords);
    delete project.timeRecords;
    res.json(project);
  } catch (err) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project getProjectById',
    });
  }
};

export const update = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
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

    let project = await projectModel.update({
      title,
      description,
      projectId,
      completed,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(403).json({
      error: 'Unexpected error',
      message: 'Unexpected error in project update',
    });
  }
};
