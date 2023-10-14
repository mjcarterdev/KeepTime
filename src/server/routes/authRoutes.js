import express from 'express';
import { login, refreshToken, register, revokeRefreshTokens } from '../controllers/authController.js';
import { isAuthenticated, validate } from '../middleware/middleware.js';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  revokeRefreshTokensSchema,
} from '../../validationSchemas/authSchema.js';

const authRouter = new express.Router();

authRouter.post('/register', validate(registerSchema.required()), register);
authRouter.post('/login', validate(loginSchema.required()), login);
authRouter.post('/refreshToken', validate(refreshTokenSchema.required()), isAuthenticated, refreshToken);
authRouter.post(
  '/revokeRefreshTokens',
  isAuthenticated,
  validate(revokeRefreshTokensSchema.required()),
  revokeRefreshTokens,
);

export default authRouter;
