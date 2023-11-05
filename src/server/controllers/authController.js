import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from '../models/authModel.js';
import {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
} from '../models/userModel.js';
import { v4 } from 'uuid';
import { generateTokens } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import hashToken from '../utils/hashToken.js';

export const register = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
  */
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({
        error: 'missing credentials',
        message: 'You must provide an email and a password and name.',
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({
        error: 'bad credentials',
        message: 'Email already in use',
      });
    }

    const user = await createUserByEmailAndPassword({ email, password, name });
    const jtid = v4();
    const { accessToken, refreshToken } = generateTokens(user, jtid);
    await addRefreshTokenToWhitelist({ jtid, refreshToken, userId: user.id });
    delete user.password;
    res
      .cookie(
        'keeptime',
        { accessToken, refreshToken },
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        },
      )
      .status(200)
      .json({
        message: 'Registered successfully 😊 👌',
        isAuthenticated: true,
        user,
      });
  } catch (err) {
    res.status(400).json({
      error: 'Unexpected error',
      message: 'Unexpected Error in registeration',
    });
  }
};

export const login = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
  */
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        error: 'missing credentials',
        message: 'You must provide a password and email.',
      });
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403).json({
        error: 'invalid credentials',
        message: 'user does not exist',
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403).json({
        error: 'invalid credentials',
        message: 'password is not valid',
      });
    }

    const jtid = v4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jtid);
    await addRefreshTokenToWhitelist({
      jtid,
      refreshToken,
      userId: existingUser.id,
    });

    delete existingUser.password;
    res
      .cookie(
        'keeptime',
        { accessToken, refreshToken },
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        },
      )
      .status(200)
      .json({
        message: 'Logged in successfully 😊 👌',
        isAuthenticated: true,
        user: existingUser,
      });
  } catch (err) {
    res.status(400).json({
      error: err || 'Unexpected error',
      message: 'unexpected error in login',
    });
  }
};

export const refreshToken = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
  */
  try {
    const keeptimeCookie = req.cookies.keeptime;
    if (!keeptimeCookie) {
      res.status(400).json({
        error: 'Unauthorized',
        message: 'missing refresh token',
      });
    }
    const payload = jwt.verify(
      keeptimeCookie.refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );
    const savedRefreshToken = await findRefreshTokenById(payload.jtid);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'saved refreshToken is revoked or not found',
      });
    }

    const hashedToken = hashToken(keeptimeCookie.refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res
        .status(401)
        .json({ error: 'Unauthorized', message: 'hashedToken do not match' });
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res
        .status(401)
        .json({ error: 'Unauthorized', message: 'could not find user' });
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jtid = v4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jtid,
    );
    await addRefreshTokenToWhitelist({
      jtid,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    delete user.password;

    res
      .cookie(
        'keeptime',
        { accessToken, refreshToken: newRefreshToken },
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        },
      )
      .status(200)
      .json({
        message: 'Token refreshed in successfully 😊 👌',
        isAuthenticated: true,
        user,
      });
  } catch (err) {
    res
      .status(401)
      .json({ error: err || 'Unexpected error', message: 'Unexpected Error' });
  }
};

export const revokeRefreshTokens = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
  */
  try {
    const { userId } = req.payload;

    await revokeTokens(userId);
    res
      .status(200)
      .clearCookie('keeptime', { path: '/' })
      .json({
        message: `User with id #${userId} logged out successfully`,
        isAuthenticated: false,
        user: {},
      });
  } catch (err) {
    res.status(401).json({
      error: err || 'Unexpected error',
      message: 'Unexpected error in revoking revoking refresh token',
    });
  }
};
