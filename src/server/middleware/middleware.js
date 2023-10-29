import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const keeptimeCookie = req.cookies.keeptime;

  if (!keeptimeCookie) {
    res.status(401).json({ error: err, message: 'no cookie found' });
  }

  try {
    const payload = jwt.verify(keeptimeCookie.accessToken, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: err, message: 'Token has expired please refresh' });
    }
    res.status(401).json({ error: err, message: 'Something went wrong with authentication' });
  }
  return next();
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
