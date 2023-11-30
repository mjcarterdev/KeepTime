import { findUserById, updateUser } from '../models/userModel.js';

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

export const changePasswordByUserId = async (req, res, next) => {};

export const updateUserById = async (req, res, next) => {
  try {
    const { user } = req.cookies['jwt'];
    const { name, email } = req.body;

    const resp = await updateUser(user.email, name, email);
    delete resp.password;
    res.json(resp);
  } catch (err) {
    next(err);
  }
};
