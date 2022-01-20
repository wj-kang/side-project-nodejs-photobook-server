const jwt = require('jsonwebtoken');

module.exports = {
  createSignedToken: (userId) => {
    return jwt.sign(
      {
        id: userId,
      },
      process.env.PHOTOBOOK_JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
  },
  decodeToken: (token) => {
    return jwt.decode(token);
  },
  verifyTokenMiddleware: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.PHOTOBOOK_JWT_SECRET_KEY);
      req.userId = decoded.id;
      console.log('token verified. userId: ', decoded.id);
      next();
    } catch (error) {
      return res.status(401).json({ error: '401 Unauthorized' });
    }
  },
};
