const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  return database.raw('SELECT id, name, calories FROM foods')
};

const find = (id) => {
  return database.raw('SELECT id, name, calories FROM foods WHERE foods.id = ?', id)
};

const create = (name, calories) => {
  return database.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES(?, ?, ?, ?) RETURNING id, name, calories',
  [name, calories, new Date, new Date])
};


module.exports = {
  all,
  find,
  create
}
