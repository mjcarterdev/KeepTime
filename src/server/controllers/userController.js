import { findUserById, updateUserByEmail } from '../models/userModel.js';

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

export const updateUser = async (req, res, next) => {
  try {
    const { user } = req.cookies['jwt'];
    const { name, email } = req.body;
    const resp = await updateUserByEmail(user.email, name, email);
    delete resp.password;
    res.json(resp);
  } catch (error) {
    next(error);
  }
};
