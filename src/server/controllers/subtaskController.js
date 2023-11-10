import * as subtaskModel from '../models/subtaskModel.js';
import { totalDurationString } from '../utils/timeUtil.js';

export const create = async (req, res, next) => {
  /* 
    #swagger.tags = ['SubTask']
    #swagger.summary = 'Create a new subtask for a project'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { title, description, projectId } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ error: 'You must provide a subtask title.' });
    }

    if (!projectId) {
      return res
        .status(400)
        .json({ error: 'You must provide a project id for subtask.' });
    }

    let subtask = await subtaskModel.create({
      title,
      description,
      projectId: projectId,
    });
    res.status(201).json(subtask);
  } catch (err) {
    next(err);
  }
};

export const deleteSubtask = async (req, res, next) => {
  /* 
    #swagger.tags = ['SubTask']
    #swagger.summary = 'Delete subtask by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const subtaskId = req.params.id;
    if (!subtaskId) {
      return res.status(400).json({ error: 'You must provide a subtask id.' });
    }

    const { user } = req.cookies['jwt'];
    // TODO: Add validation

    await subtaskModel.deleteById(subtaskId);
    res.json({ message: 'Subtask deleted' });
  } catch (err) {
    next(err);
  }
};

export const getProjectSubtasks = async (req, res, next) => {
  /* 
    #swagger.tags = ['SubTask']
    #swagger.summary = 'Get list of project subtasks'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const projectId = req.params.projectId;

    let subtasks = await subtaskModel.getAllByProjectId(projectId);
    let subtasksWithDuration = subtasks.map((subtask) =>
      Object.assign(subtask, {
        totalDuration: totalDurationString(subtask.timeRecords),
      }),
    );
    res.json(subtasksWithDuration);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  /* 
    #swagger.tags = ['SubTask']
    #swagger.summary = 'Get subtask by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const subtaskId = req.params.id;
    console.log(subtaskId);
    let subtask = await subtaskModel.getById(subtaskId);
    subtask.totalDuration = totalDurationString(subtask.timeRecords);
    return res.json(subtask);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  /* 
    #swagger.tags = ['SubTask']
    #swagger.summary = 'Update subtask by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { title, description } = req.body;
    const subtaskId = req.params.id;

    if (!subtaskId) {
      return res.status(400).json({ error: 'You must provide a subtask id.' });
    }

    const { user } = req.cookies['jwt'];
    // TODO: Add validation

    let subtask = await subtaskModel.update({ title, description, subtaskId });
    res.json(subtask);
  } catch (err) {
    next(err);
  }
};
