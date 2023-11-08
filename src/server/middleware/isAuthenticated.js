import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies['jwt'];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ error: err });
      } else {
        next();
      }
    });
  } catch (error) {}
};

export default isAuthenticated;
