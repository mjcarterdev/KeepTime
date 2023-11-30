import { hashSync } from 'bcrypt';
import db from '../utils/database.js';

export const findUserByEmail = (email) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUserByEmailAndPassword = (user) => {
  user.password = hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
};

export const findUserById = (id) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUserByEmail = (user, name, email) => {
  return db.user.update({
    where: {
      email: user,
    },
    data: {
      name,
      email,
    },
  });
};
