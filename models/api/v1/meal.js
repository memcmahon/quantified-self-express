const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  return database.raw(`SELECT meals.id, meals.name, json_agg(
                      json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories))
                      AS foods
                      FROM meals
                      JOIN mealfoods ON meals.id = mealfoods.meal_id
                      JOIN foods ON mealfoods.food_id = foods.id
                      GROUP BY meals.id`)
};

module.exports = {
  all,
}
