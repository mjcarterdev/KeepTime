import express from 'express';
import { getAllProjects } from '../controllers/projectController';
import authenticationToken from '../middlewares/authJWT';

const projectRouter = new express.Router();

projectRouter.use(authenticationToken);
projectRouter.get('/projects', getAllProjects);
projectRouter.get('/projects/:id', getProjectById);

export default projectRouter;
