const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const create = (meal_id, food_id) => {
  return database.raw(`INSERT INTO mealfoods (meal_id, food_id, created_at, updated_at) VALUES(?, ?, ?, ?)`,
                      [meal_id, food_id, new Date, new Date])
}

module.exports = {
  create
}
