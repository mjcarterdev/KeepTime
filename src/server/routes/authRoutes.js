import express from 'express';
import { login, refreshToken, register, revokeRefreshTokens } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/middleware.js';

const authRouter = new express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refreshToken', isAuthenticated, refreshToken);
authRouter.post('/revokeRefreshTokens', isAuthenticated, revokeRefreshTokens);

export default authRouter;
