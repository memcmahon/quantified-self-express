const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const MealFood = require('../../../models/api/v1/mealfood');
const Food = require('../../../models/api/v1/food');
const Meal = require('../../../models/api/v1/meal');

const create = (req, res) => {
  let food;
  let meal;

  Food.find(req.params.id)
    .then((data) => {
      food = data.rows[0].name
    });

  Meal.find(req.params.meal_id)
    .then((data) => {
      meal = data.rows[0].name
    });

  MealFood.create(req.params.meal_id, req.params.id)
    .then((data) => {
      res.status(201).json({message: `Successfully added ${food} to ${meal}`})
    });
}

module.exports = {
  create
}
