import hashToken from '../utils/hashToken.js';
import db from '../utils/database.js';

// used when we create a refresh token.
export const addRefreshTokenToWhitelist = ({ jtid, refreshToken, userId }) => {
  return db.refreshToken.create({
    data: {
      id: jtid,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

// used to check if the token sent by the client is in the database.
export const findRefreshTokenById = async (id) => {
  return await db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

// soft delete tokens after usage.
export const deleteRefreshToken = (id) => {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId) => {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
