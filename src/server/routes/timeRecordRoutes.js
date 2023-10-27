import express from 'express';
import { isAuthenticated, validate } from '../middleware/middleware.js';
import { timeRecordSchema } from '../validationSchemas/timeRecordSchema.js';
import * as timeRecordController from '../controllers/timeRecordController.js';

const projectRouter = new express.Router();

projectRouter.use(isAuthenticated);
projectRouter.post('/create', validate(timeRecordSchema.required()), timeRecordController.create);
projectRouter.post('/start', validate(timeRecordSchema.required()), timeRecordController.start);
projectRouter.put('/stop/:id', timeRecordController.stop);
projectRouter.get('/allByProjectId/:projectId', timeRecordController.getAllByProjectId);
projectRouter.get('/allBySubtaskId/:subtaskId', timeRecordController.getAllBySubtaskId);
projectRouter.get('/:id', timeRecordController.getById);
projectRouter.delete('/delete/:id', timeRecordController.deleteTimeRecord);
projectRouter.put('/update/:id', validate(timeRecordSchema.required()), timeRecordController.update);

export default projectRouter;
