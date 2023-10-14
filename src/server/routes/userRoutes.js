import express from 'express';
import { getUserProfile, getUserPreferences, setUserPreferences } from '../controllers/userController';
import { isAuthenticated } from '../middleware/middleware';

const userRouter = new express.Router();

userRouter.use(isAuthenticated);
userRouter.get('/profile', getUserProfile);
userRouter.get('/preferences/', getUserPreferences);
userRouter.post('/preferences', setUserPreferences);

export default userRouter;
