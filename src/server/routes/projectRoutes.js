import express from 'express';
import { validate } from '../middleware/validation.js';
import { projectSchema } from '../validationSchemas/projectSchema.js';
import * as projectController from '../controllers/projectController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const projectRouter = new express.Router();

projectRouter.use(isAuthenticated);
projectRouter.post(
  '/createNew',
  validate(projectSchema.required()),
  projectController.create,
);
projectRouter.get('/getUserProjects', projectController.getAllUserProjects);
projectRouter.get('/:id', projectController.getProjectById);
projectRouter.delete('/delete/:id', projectController.deleteProject);
projectRouter.put(
  '/update/:id',
  validate(projectSchema.required()),
  projectController.update,
);

export default projectRouter;
