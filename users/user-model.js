const db = require('../data/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find(department) {
  const query = db('users').select('id', 'username', 'department');

  if (department) {
    query
    .where({ department })
  } 
    return query 
}

function findBy(username) {
  return db('users')
    .where(username)
    .then(user => {
        if (user.length) {
            return user[0]
        } else {
            return null
        }
    })
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}