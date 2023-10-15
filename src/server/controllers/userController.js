import { addRefreshTokenToWhitelist, deleteRefreshToken, findRefreshTokenById } from '../models/authModel.js';
import { findUserById } from '../models/userModel.js';

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
};