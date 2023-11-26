import {
  findUserByEmail,
  createUserByEmailAndPassword,
} from '../models/userModel.js';
import { v4 } from 'uuid';
import { generateTokens } from '../auth/jwt.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({
        error: 'bad credentials',
        message: 'Email already in use',
      });
    } else {
      const user = await createUserByEmailAndPassword({
        email,
        password,
        name,
      });

      const tokenId = v4();
      const { accessToken, refreshToken } = generateTokens(user, tokenId);

      delete user.password;
      res
        .cookie(
          'jwt',
          { accessToken, refreshToken, tokenId, user },
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          },
        )
        .status(200)
        .json({
          message: 'Registered successfully 😊 👌',
          user,
        });
    }
  } catch (err) {
    res.status(400).json({
      error: err,
      message: 'Unexpected Error in registeration',
    });
  }
};

export const login = async (req, res) => {
  let user;

  if (res.locals.user) {
    user = res.locals.user;
  } else {
    res.status(400).json({
      error: 'user not found',
    });
  }

  try {
    const tokenId = v4();
    const { accessToken, refreshToken } = generateTokens(user, tokenId);
    res
      .cookie(
        'jwt',
        { tokenId, accessToken, refreshToken, user },
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        },
      )
      .status(200)
      .json({
        message: 'Logged in successfully 😊 👌',
        user,
      });
  } catch (err) {
    res.status(400).json({
      error: err || 'Unexpected error',
      message: 'unexpected error in login',
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    if (req.cookies['jwt']) {
      const { refreshToken, user } = req.cookies['jwt'];

      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
        if (err) {
          return res
            .status(401)
            .json({ error: err, message: 'REFRESH_TOKEN_EXPIRED' });
        } else {
          const tokenId = v4();
          const { accessToken, refreshToken } = generateTokens(user, tokenId);
          res
            .cookie(
              'jwt',
              { tokenId, accessToken, refreshToken, user },
              {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
              },
            )
            .status(200)
            .json({
              message: 'refreshed successful',
              user,
            });
        }
      });
    }
  } catch (err) {
    res.status(401).json({
      error: err || 'Unexpected error',
      message: 'Refresh token error',
    });
  }
};

export const logout = async (req, res) => {
  if (req.cookies['jwt']) {
    res.clearCookie('jwt').status(200).json({
      message: 'You have logged out',
    });
  } else {
    res.status(401).json({
      error: 'Invalid jwt',
    });
  }
};
