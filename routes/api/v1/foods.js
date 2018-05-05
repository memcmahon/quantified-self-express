const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

var express = require('express');
var app = express.Router();

const foodsController = require('../../../controllers/api/v1/foods');

app.get('/', (req, res) => {
  foodsController.getFoods(req, res);
});

module.exports = app;
