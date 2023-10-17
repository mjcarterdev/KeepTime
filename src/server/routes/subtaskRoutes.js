import express from 'express';
import { isAuthenticated, validate } from '../middleware/middleware.js';
import { subtaskSchema } from '../validationSchemas/subtaskSchema.js';
import * as subtaskController from '../controllers/subtaskController.js';

const subtaskRouter = new express.Router();

subtaskRouter.use(isAuthenticated);

subtaskRouter.post('/createNew', validate(subtaskSchema.required()), subtaskController.create);
subtaskRouter.get('/getProjectSubtasks/:projectId', subtaskController.getProjectSubtasks);
subtaskRouter.get('/getById/:id', subtaskController.getById);
subtaskRouter.delete('/delete/:id', subtaskController.deleteSubtask);
subtaskRouter.put('/update/:id', subtaskController.update);

export default subtaskRouter;
