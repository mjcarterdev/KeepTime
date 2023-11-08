import express from 'express';
import { validate } from '../middleware/validation.js';
import { subtaskSchema } from '../validationSchemas/subtaskSchema.js';
import * as subtaskController from '../controllers/subtaskController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const subtaskRouter = new express.Router();

subtaskRouter.use(isAuthenticated);
subtaskRouter.post(
  '/createNew',
  validate(subtaskSchema.required()),
  subtaskController.create,
);
subtaskRouter.get(
  '/getProjectSubtasks/:projectId',
  subtaskController.getProjectSubtasks,
);
subtaskRouter.get('/:subtaskId', subtaskController.getById);
subtaskRouter.delete('/delete/:subtaskId', subtaskController.deleteSubtask);
subtaskRouter.put(
  '/update/:subtaskId',
  validate(subtaskSchema.required()),
  subtaskController.update,
);

export default subtaskRouter;
