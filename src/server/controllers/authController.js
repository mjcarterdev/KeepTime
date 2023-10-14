import { addRefreshTokenToWhitelist } from '../models/authModel.js';
import { findUserByEmail, createUserByEmailAndPassword } from '../models/userModel.js';
import { v4 } from 'uuid';
import { generateTokens } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  console.log(req.body);
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

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
