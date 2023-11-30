import express from 'express';
import {
  getUserById,
  changePasswordByUserId,
  updateUserById,
} from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const userRouter = new express.Router();

userRouter.use(isAuthenticated);
userRouter.get('/profile', getUserById);
userRouter.post('/changePassword', changePasswordByUserId);
userRouter.patch('/profile', updateUserById);

export default userRouter;
