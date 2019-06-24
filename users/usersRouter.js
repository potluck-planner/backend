const router = require('express').Router();
const Users = require('./usersModel');

router.get('/', (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id', (req, res) => {
  Users.getUserById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id/events', (req, res) => {
  Users.getUserEvents(req.params.id)
    .then(event => {
      console.log(event);
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/register', (req, res) => {
  Users.registerUser(req.body)
    .then(user => {
      res.status(201).json({ message: 'User successfully created.' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/login', (req, res) => {
  Users.loginUser(req.body.username)
    .then(user => {
      if (req.body.password === user.password) {
        res.send(200).json({ message: 'user successfully logged in' });
      } else {
        res.send(401).json({ message: 'incorrect username or password' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

module.exports = router;
