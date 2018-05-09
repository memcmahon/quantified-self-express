const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

var express = require('express');
var app = express.Router();

const mealsController = require('../../../controllers/api/v1/meals');
const mealFoodsController = require('../../../controllers/api/v1/mealfoods');

app.get('/', (req, res) => {
  mealsController.getMeals(req, res);
});

app.get('/:id/foods', (req, res) => {
  mealsController.getMeal(req, res);
});

app.post('/:meal_id/foods/:id', (req, res) => {
  mealFoodsController.create(req, res);
});

app.delete('/:meal_id/foods/:id', (req, res) => {
  mealFoodsController.destroy(req, res);
})

module.exports = app;
