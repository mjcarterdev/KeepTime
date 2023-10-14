import express from 'express';
import {
  login,
  register,
  logout,
  refreshToken,
  resetPasswordByEmail,
  restPasswordByUserId,
} from '../controllers/authController';

const authRouter = new express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.get('/refreshToken', refreshToken);
authRouter.post('/resetPassword', restPasswordByUserId);
authRouter.post('/forgottenPassword', resetPasswordByEmail);

export default authRouter;
