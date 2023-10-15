import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from '../models/authModel.js';
import { findUserByEmail, createUserByEmailAndPassword, findUserById } from '../models/userModel.js';
import { v4 } from 'uuid';
import { generateTokens } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import hashToken from '../utils/hashToken.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400);
      throw new Error('You must provide an email and a password and name.');
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    const user = await createUserByEmailAndPassword({ email, password, name });
    const jtid = v4();
    const { accessToken, refreshToken } = generateTokens(user, jtid);
    await addRefreshTokenToWhitelist({ jtid, refreshToken, userId: user.id });

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
      .json({ message: 'Registered successfully 😊 👌' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jtid = v4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jtid);
    await addRefreshTokenToWhitelist({ jtid, refreshToken, userId: existingUser.id });

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
      .json({ token: accessToken, message: 'Logged in successfully 😊 👌' });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const keeptimeCookie = req.cookies.keeptime;
    if (!keeptimeCookie) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = jwt.verify(keeptimeCookie.refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jtid);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(keeptimeCookie.refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jtid = v4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jtid);
    await addRefreshTokenToWhitelist({ jtid, refreshToken: newRefreshToken, userId: user.id });

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
      .json({ message: 'Token refreshed in successfully 😊 👌' });
  } catch (err) {
    next(err);
  }
};

export const revokeRefreshTokens = async (req, res, next) => {
  try {
    console.log(req.payload);
    const { userId } = req.payload;
    await revokeTokens(userId);
    res
      .status(200)
      .clearCookie('keeptime', { path: '/' })
      .json({ message: `User with id #${userId} logged out successfully` });
  } catch (err) {
    next(err);
  }
};
