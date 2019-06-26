const db = require('../dbConfig');

module.exports = {
  createEvent,
  getEvent,
  getEventGuests,
  getEventFood,
  getLocation,
  addLocation,
  addFood,
  addGuest,
  updateEvent,
  getEvents,
  updateGuest,
  updateFood,
  updateLocation,
  delEvent,
  delFood,
  delGuest
};

function createEvent(event) {
  return db('event').insert(event);
}

function getEvents() {
  return db('event');
}

function getEvent(event_id) {
  return db('event')
    .where({ event_id })
    .first();
}

function getEventFood(event_id) {
  return db('event_food_list').where({ event_id });
}

function getEventGuests(id) {
  return db
    .select('*')
    .from('potluck_guest')
    .where({ event_id: id });
}

function getLocation(id) {
  return db
    .select('*')
    .from('location')
    .where({ event_id: id });
}

function addLocation(event_id, location) {
  return db('location').insert({
    event_id,
    address: location.address,
    city: location.city,
    state: location.state
  });
}

function addFood(id, food) {
  return db('event_food_list').insert({
    event_id: id,
    recipe_name: food.recipe_name
  });
}

function addGuest(id, guest) {
  return db('potluck_guest').insert({
    event_id: id,
    username: guest.username,
    going: guest.going
  });
}

function updateEvent(id, event) {
  return db('event')
    .where({ event_id: id })
    .update(event);
}

function updateLocation(id, location) {
  return db('location')
    .where({ event_id: id })
    .update(location);
}

function updateFood(id, food) {
  return db('event_food_list')
    .where({ event_id: id })
    .update(food);
}

function updateGuest(id, guest) {
  return db('potluck_guest')
    .where({ event_id: id })
    .andWhere(function() {
      this.where('username', '=', guest.username);
    })
    .update(guest);
}

function delEvent(id) {
  return db('event')
    .where({ event_id: id })
    .del();
}

function delFood(id, food) {
  return db('event_food_list')
    .where({ event_id: id })
    .andWhere(function() {
      this.where('recipe_name', '=', food);
    })
    .del();
}

function delGuest(id, user) {
  return db('potluck_guest')
    .where({ event_id: id })
    .andWhere(function() {
      this.where('username', '=', user);
    })
    .del();
}
