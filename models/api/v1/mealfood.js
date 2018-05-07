const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const create = (meal_id, food_id) => {
  return database.raw(`INSERT INTO mealfoods (meal_id, food_id, created_at, updated_at) VALUES(?, ?, ?, ?)`,
                      [meal_id, food_id, new Date, new Date])
};

const destroy = (meal_id, food_id) => {
  return database.raw(`DELETE FROM mealfoods WHERE meal_id = ${meal_id} AND food_id = ${food_id}`)
}

module.exports = {
  create,
  destroy
}
