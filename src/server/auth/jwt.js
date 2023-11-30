import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const generateRefreshToken = (user, tokenId) => {
  return jwt.sign(
    {
      userId: user.id,
      tokenId,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '30d',
    },
  );
};

export const generateTokens = (user, tokenId) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, tokenId);

  return {
    accessToken,
    refreshToken,
  };
};
