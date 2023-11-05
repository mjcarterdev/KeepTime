import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const keeptimeCookie = req.cookies.keeptime;
  if (keeptimeCookie) {
    try {
      const payload = jwt.verify(
        keeptimeCookie.accessToken,
        process.env.JWT_ACCESS_SECRET,
      );
      req.payload = payload;
      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res
          .status(401)
          .json({ error: error, message: 'Token has expired please refresh' });
      } else {
        res.status(401).json({
          error: error,
          message: 'Something went wrong with authentication',
        });
      }
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(400).json({ error: err, message: 'Validation error' });
  }
};
