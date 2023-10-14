import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
};

export const generateRefreshToken = (user, jtid) => {
  return jwt.sign(
    {
      userId: user.id,
      jtid,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '24h',
    },
  );
};

export const generateTokens = (user, jtid) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jtid);

  return {
    accessToken,
    refreshToken,
  };
};
