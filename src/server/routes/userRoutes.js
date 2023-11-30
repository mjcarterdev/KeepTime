import express from 'express';
import { getUserById, updateUser } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const userRouter = new express.Router();

userRouter.use(isAuthenticated);
userRouter.get('/profile', getUserById);
userRouter.post('/profile', updateUser);

export default userRouter;
