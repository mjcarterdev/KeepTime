import { findUserById } from '../models/userModel.js';

export const getUserById = async (req, res, next) => {
  try {
    const { user } = req.cookies['jwt'];
    const resp = await findUserById(user.id);
    delete resp.password;
    res.json(resp);
  } catch (err) {
    next(err);
  }
};
