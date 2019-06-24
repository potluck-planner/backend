const router = require('express').Router();
const Event = require('./eventModel');

router.get('/:id', (req, res) => {
  Event.getEvent(req.param.id)
    .then(event => {
      res.status(200).json(event);
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

router.post('/', (req, res) => {
  Event.createEvent(req.body)
    .then(event => {
      res.status(201).json({ message: 'event successfully created' });
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error.', error: err });
    });
});

router.post('/:id/location', (req, res) => {
  Event.addLocation(req.params.id, req.body)
    .then(location => {
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

module.exports = router;