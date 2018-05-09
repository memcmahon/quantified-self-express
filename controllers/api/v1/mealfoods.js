const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const MealFood = require('../../../models/api/v1/mealfood');
const Food = require('../../../models/api/v1/food');
const Meal = require('../../../models/api/v1/meal');

let food;
let meal;

const create = (req, res) => {
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
};

const destroy = (req, res) => {
  Food.find(req.params.id)
    .then((data) => {
      food = data.rows[0].name
    });

  Meal.find(req.params.meal_id)
    .then((data) => {
      meal = data.rows[0].name
    });

  MealFood.destroy(req.params.meal_id, req.params.id)
    .then((data) => {
      res.json({message: `Successfully deleted ${food} from ${meal}`})
    });
};

module.exports = {
  create,
  destroy
}
