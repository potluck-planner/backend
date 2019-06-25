const router = require('express').Router();
const Event = require('./eventModel');
const verifyLogin = require('../auth/verifyLogin');
const db = require('../dbConfig');

router.get('/', (req, res) => {
  Event.getEvents()
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id', (req, res) => {
  Event.getEvent(req.params.id)
    .then(event => {
      Event.getEventGuests(req.params.id).then(guests => {
        Event.getLocation(req.params.id).then(location => {
          Event.getEventFood(req.params.id).then(food => {
            eventDetails = {
              event,
              guests,
              location,
              food
            };
            res.status(200).json(eventDetails);
          });
        });
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id/guests', (req, res) => {
  Event.getEventGuests(req.params.id)
    .then(guests => {
      res.status(200).json(guests);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.get('/:id/location', (req, res) => {
  Event.getLocation(req.params.id)
    .then(location => {
      res.status(200).json(location);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/', (req, res) => {
  Event.createEvent(req.body)
    .then(event => {
      Event.getEvent(event[0]).then(event => {
        db.select('username')
          .from('users')
          .where({ id: event.organizer_id })
          .then(user => {
            Event.addGuest(event.event_id, user[0]).then(guest => {
              res
                .status(201)
                .json({ message: 'event successfully created', event });
            });
          });
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/location', (req, res) => {
  Event.addLocation(req.params.id, req.body)
    .then(location => {
      console.log(location);
      res.status(201).json({ message: 'location successfully added' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/foodlist', (req, res) => {
  Event.addFood(req.params.id, req.body)
    .then(food => {
      res.status(201).json({ message: 'food successfully added' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/guests', (req, res) => {
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
      if (event) {
        res.status(202).json({ message: 'event successfully deleted', event });
      } else {
        res.status(404).json({ message: 'event not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.delete('/:id/foodlist', (req, res) => {
  Event.delFood(req.params.id, req.body.recipe_name)
    .then(food => {
      if (food) {
        res.status(202).json({ message: 'food successfully deleted', food });
      } else {
        res.status(404).json({ message: 'food not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.delete('/:id/guests', (req, res) => {
  Event.delGuest(req.params.id, req.body.username)
    .then(guest => {
      if (guest) {
        res.status(202).json({ message: 'guest successfully deleted' });
      } else {
        res.status(404).json({ message: 'guest not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

module.exports = router;
