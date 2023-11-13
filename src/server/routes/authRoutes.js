import express from 'express';
import {
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/authController.js';
import { validate } from '../middleware/validation.js';
import {
  loginSchema,
  registerSchema,
} from '../validationSchemas/authSchema.js';
import loginMiddleware from '../middleware/login-middleware.js';

const authRouter = new express.Router();

authRouter.post('/register', validate(registerSchema.required()), register);
authRouter.post(
  '/login',
  loginMiddleware,
  validate(loginSchema.required()),
  login,
);
authRouter.get('/refreshToken', refreshToken);
authRouter.get('/logout', logout);

export default authRouter;
