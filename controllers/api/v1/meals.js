const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const Meal = require('../../../models/api/v1/meal');

const getMeals = (req, res) => {
  Meal.all()
    .then((data) => {
      res.status(200).json(data.rows)
    })
};

const getMeal = (req, res) => {
  Meal.find(req.params["id"])
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
}

module.exports = {
  getMeals,
  getMeal
}
