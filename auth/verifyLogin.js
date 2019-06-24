const jwt = require('jsonwebtoken');
const secret = require('../secret/secretKey');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.secretKey, (err, decoded) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const user = {
          id: decoded.id,
          username: decoded.username,
          department: decoded.department
        };
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'please log in' });
  }
};
