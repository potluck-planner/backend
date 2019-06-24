const db = require('../dbConfig');

module.exports = {
  getUsers,
  getUserById,
  registerUser
};

function getUsers() {
  return db('users');
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserEvents(id) {
  return db
    .select('*')
    .from('potluck_guest')
    .where({ user_id: id })
    .innerJoin('events', 'potluck_guest.event_id', 'event.event_id');
}

function registerUser(info) {
  return db('users').insert(info);
}
