const router = require('express').Router();
const Users = require('../users/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../secret/secretKey');

router.post('/register', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 8);

  req.body = {
    username: req.body.username,
    password: hash
  };

  Users.registerUser(req.body)
    .then(user => {
      res
        .status(200)
        .json({ message: 'user successfully created', user });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/login', (req, res) => {
  Users.loginUser(req.body.username)
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);

        req.headers.authorization = token;

        res.status(200).json({ message: `successfully logged in`, token });
      } else {
        res.status(400).json({ message: 'invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.secretKey, options);
}

module.exports = router;