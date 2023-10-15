import express from 'express';
import { isAuthenticated, validate } from '../middleware/middleware.js';
import { projectSchema } from '../../validationSchemas/projectSchema.js';
import * as projectController from '../controllers/projectController.js';

const projectRouter = new express.Router();

projectRouter.use(isAuthenticated);
projectRouter.post('/createNew', validate(projectSchema.required()), projectController.create);
projectRouter.get('/getUserProjects', projectController.getAllUserProjects);
projectRouter.delete('/delete', projectController.deleteProject);
projectRouter.put('/update', projectController.update);

export default projectRouter;
