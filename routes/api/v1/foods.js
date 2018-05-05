const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

var express = require('express');
var app = express.Router();

app.get('/', (req, res) => {
  database.raw('SELECT * FROM foods')
    .then((foods) => {
      res.json(foods.rows)
    });
});

module.exports = app;
