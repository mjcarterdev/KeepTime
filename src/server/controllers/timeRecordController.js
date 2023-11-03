import * as timeRecordModel from '../models/timeRecordModel.js';

export const create = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Create a new time record.'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { startTime, endTime, projectId, subtaskId } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: 'You must provide a project id for timer.' });
    }

    if (!startTime || !endTime) {
      return res.status(400).json({ error: 'You must provide start and end time.' });
    }

    if (new Date(startTime) > new Date(endTime)) {
      return res.status(400).json({ error: 'You must provide valid start and end time. The end date cannot be earlier than the start date.' });
    }

    const { userId } = req.payload;
    // TODO: Add validation

    let timeRecord = await timeRecordModel.create({ startTime, endTime, projectId, subtaskId });
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};

export const start = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Start timer'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { projectId, subtaskId } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: 'You must provide a project id for timer.' });
    }

    let timeRecord = await timeRecordModel.start({ projectId: projectId, subtaskId: subtaskId });
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};

export const stop = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Stop timer by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const timeRecordId = req.params.id;

    if (!timeRecordId) {
      return res.status(400).json({ error: 'You must provide a time record id.' });
    }

    const { userId } = req.payload;
    // TODO: Add validation

    let timeRecord = await timeRecordModel.stop(timeRecordId);
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};

export const deleteTimeRecord = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Delete time record by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const timeRecordId = req.params.id;
    if (!timeRecordId) {
      return res.status(400).json({ error: 'You must provide a time record id.' });
    }

    // TODO: Add validation
    const { userId } = req.payload;

    await timeRecordModel.deleteById(timeRecordId);
    res.json({ message: 'Time record deleted' });
  } catch (err) {
    next(err);
  }
};

export const getAllByProjectId = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Get list of project time records'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const projectId = req.params.projectId;

    let timeRecord = await timeRecordModel.getAllByProjectId(projectId);
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};

export const getAllBySubtaskId = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Get list of subtask time records'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const subtaskId = req.params.subtaskId;

    let timeRecord = await timeRecordModel.getAllBySubtaskId(subtaskId);
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Update time record by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const { startTime, endTime } = req.body;
    const timeRecordId = req.params.id;

    if (!timeRecordId) {
      return res.status(400).json({ error: 'You must provide a time record id.' });
    }

    if (new Date(startTime) > new Date(endTime)) {
      return res.status(400).json({ error: 'You must provide valid start and end time. The end date cannot be earlier than the start date.' });
    }

    const { userId } = req.payload;
    // TODO: Add validation

    let timeRecord = await timeRecordModel.update({ startTime, endTime, timeRecordId });
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  /* 
    #swagger.tags = ['TimeRecord']
    #swagger.summary = 'Get time record by Id'
    #swagger.security = [{"cookieAuth:": [] }]
  */
  try {
    const timeRecordId = req.params.id;

    let timeRecord = await timeRecordModel.getById(timeRecordId);
    res.json(timeRecord);
  } catch (err) {
    next(err);
  }
};
