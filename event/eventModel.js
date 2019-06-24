const db = require('../dbConfig');

module.exports = {
  createEvent,
  getEvent,
  getEventGuests,
  addLocation,
  addFood,
  addGuest,
  updateEvent,
};

function createEvent(event) {
  return db('event').insert(event);
}

function getEvent(id) {
  return db('event')
    .where({ event_id: id })
    .first();
}

function getEventGuests(id) {
  db.select('*')
    .from('potluck_guest')
    .where({ event_id: id });
}

function addLocation(id, location) {
  db('location').insert({
    event_id: id,
    address: location.address,
    city: location.city,
    state: location.state
  });
}

function addFood(id, food) {
  db('event_food_list').insert({ event_id: id, recipe_name: food.recipe_name });
}

function addGuest(id, guest) {
  db('potluck_guest').insert({ event_id: id, username: guest });
}

function updateEvent(id, event) {
  db('event')
    .where({ event_id: id })
    .update({ event });
}

function updateEvent(id, event) {
  db('location')
    .where({ event_id: id })
    .update({ event })
}

