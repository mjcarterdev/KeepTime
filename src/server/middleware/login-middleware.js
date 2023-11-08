import bcrypt from 'bcrypt';
import { findUserByEmail } from '../models/userModel.js';

const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await findUserByEmail(email);

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        delete user.password;
        res.locals.user = user;
        next();
      } else {
        res.status(400).json({
          error: 'Incorrect username or password',
        });
      }
    } else {
      res.status(400).json({
        error: 'Incorrect username or password',
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default loginMiddleware;
