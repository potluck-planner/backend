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

router.get('/:name/events', (req, res) => {
  Users.getUserEvents(req.params.name)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

module.exports = router;