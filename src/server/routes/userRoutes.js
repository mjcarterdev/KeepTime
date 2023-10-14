import express from 'express';
import { getUserById } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/middleware.js';

const userRouter = new express.Router();

userRouter.use(isAuthenticated);
userRouter.get('/profile', getUserById);

export default userRouter;
