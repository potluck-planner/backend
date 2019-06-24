const router = require('express').Router();
const Event = require('./eventModel');
const verifyLogin = require('../auth/verifyLogin');

router.get('/', verifyLogin, (req, res) => {
  Event.getEvents()
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id', verifyLogin, (req, res) => {
  Event.getEvent(req.params.id)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id/guests', verifyLogin, (req, res) => {
  Event.getEventGuests(req.params.id)
    .then(guests => {
      res.status(200).json(guests);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/', verifyLogin, (req, res) => {
  Event.createEvent(req.body)
    .then(event => {
      res.status(201).json({ message: 'event successfully created' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/location', verifyLogin, (req, res) => {
  Event.addLocation(req.params.id, req.body)
    .then(location => {
      console.log(location);
      res.status(201).json({ message: 'location successfully added' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/foodlist', verifyLogin, (req, res) => {
  Event.addFood(req.params.id, req.body)
    .then(food => {
      res.status(201).json({ message: 'food successfully added' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/guests', verifyLogin, (req, res) => {
  Event.addGuest(req.params.id, req.body)
    .then(guest => {
      res.status(201).json({ message: 'guest invited' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.put('/:id', (req, res) => {
  Event.updateEvent(req.params.id, req.body)
    .then(event => {
      res.status(202).json({ message: 'event successfully updated', event });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.put('/:id/location', (req, res) => {
  Event.updateLocation(req.params.id, req.body)
    .then(location => {
      res
        .status(202)
        .json({ message: 'location successfully updated', location });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.put('/:id/foodlist', (req, res) => {
  Event.updateFood(req.params.id, req.body)
    .then(food => {
      res.status(202).json({ message: 'food successfully updated', food });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.put('/:id/guests', (req, res) => {
  Event.updateGuest(req.params.id, req.body)
    .then(food => {
      res.status(202).json({ message: 'guest successfully updated', food });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.delete('/:id', (req, res) => {
  Event.delEvent(req.params.id)
    .then(event => {
      res.status(202).json({ message: 'event successfully deleted', event });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.delete('/:id/foodlist', (req, res) => {
  Event.delFood(req.params.id, req.body.recipe_name)
    .then(food => {
      res.status(202).json({ message: 'food successfully deleted', food });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

module.exports = router;
