import db from '../utils/database.js';

export const create = (timeRecordData) => {
  return db.timeRecord.create({
    data: {
      startTime: timeRecordData.startTime,
      endTime: timeRecordData.endTime,
      projectId: timeRecordData.projectId,
      subTaskId: timeRecordData.subtaskId || undefined,
    },
  });
};

export const start = (timeRecordData) => {
  return db.timeRecord.create({
    data: {
      projectId: timeRecordData.projectId,
      subTaskId: timeRecordData.subtaskId || undefined,
    },
  });
};

export const stop = (timeRecordId) => {
  return db.timeRecord.update({
    where: { id: timeRecordId },
    data: {
      endTime: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const getAllByProjectId = (id) => {
  return db.timeRecord.findMany({
    where: {
      projectId: id,
    },
  });
};

export const getAllBySubtaskId = (id) => {
  return db.timeRecord.findMany({
    where: {
      subTaskId: id,
    },
  });
};

export const deleteById = (id) => {
  return db.timeRecord.delete({
    where: {
      id,
    },
  });
};

export const update = (timeRecordData) => {
  return db.timeRecord.update({
    where: { id: timeRecordData.timeRecordId },
    data: {
      startTime: timeRecordData.startTime || undefined,
      endTime: timeRecordData.endTime || undefined,
      updatedAt: new Date(),
    },
  });
};

export const getById = (id) => {
  return db.timeRecord.findUnique({
    where: {
      id,
    },
  });
};
