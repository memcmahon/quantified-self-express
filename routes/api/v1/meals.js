const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

var express = require('express');
var app = express.Router();

const mealsController = require('../../../controllers/api/v1/meals');

app.get('/', (req, res) => {
  mealsController.getMeals(req, res);
});

module.exports = app;
