import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const keeptimeCookie = req.cookies.keeptime;
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(401);
    throw new Error('Un-Authorized no access token found');
  }

  try {
    const payload = jwt.verify(keeptimeCookie.accessToken, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error(`Un-Authorized other error ${err}`);
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
  } catch (error) {
    return res.status(400).json(error);
  }
};
