import { findUserById } from '../models/userModel.js';

export const getUserById = async (req, res, next) => {
  /* 
    #swagger.tags = ['User']
  */
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
};
