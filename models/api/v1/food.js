const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  return database.raw('SELECT id, name, calories FROM foods')
};

const find = (id) => {
  return database.raw('SELECT id, name, calories FROM foods WHERE foods.id = ?', id)
};

module.exports = {
  all,
  find,
}
