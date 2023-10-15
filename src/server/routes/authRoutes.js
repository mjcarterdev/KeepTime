import express from 'express';
import { login, refreshToken, register, revokeRefreshTokens } from '../controllers/authController.js';
import { isAuthenticated, validate } from '../middleware/middleware.js';
import { loginSchema, registerSchema, revokeRefreshTokensSchema } from '../../validationSchemas/authSchema.js';

const authRouter = new express.Router();

authRouter.post('/register', validate(registerSchema.required()), register);
authRouter.post('/login', validate(loginSchema.required()), login);
authRouter.get('/refreshToken', isAuthenticated, refreshToken);
authRouter.get('/revokeRefreshTokens', isAuthenticated, revokeRefreshTokens);

export default authRouter;
