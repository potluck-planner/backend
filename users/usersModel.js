const db = require('../dbConfig');

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  getUserEvents,
  loginUser
};

function getUsers() {
  return db('users');
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserEvents(username) {
  return db
    .select('*')
    .from('potluck_guest')
    .where({ username }).innerJoin('event', 'potluck_guest.event_id', 'event.event_id')
}

function registerUser(info) {
  return db('users').insert(info);
}

function loginUser(username) {
  return db('users')
    .where({ username })
    .first();
}
