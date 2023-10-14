import express from 'express';
import { getUserProfile, getUserPreferences, setUserPreferences } from '../controllers/userController';
import authenticationToken from '../utils/authJWT';

const userRouter = new express.Router();

userRouter.use(authenticationToken);
userRouter.get('/profile', getUserProfile);
userRouter.get('/preferences/', getUserPreferences);
userRouter.post('/preferences', setUserPreferences);

export default userRouter;
