const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

var express = require('express');
var app = express.Router();
var cors = require('cors');
app.use(cors());

const foodsController = require('../../../controllers/api/v1/foods');

app.get('/', (req, res, next) => {
  foodsController.index(req, res);
});

app.get('/:id', (req, res) => {
  foodsController.show(req, res);
});

app.post('/', (req, res) => {
  foodsController.create(req, res);
});

app.patch('/:id', (req, res) => {
  foodsController.update(req, res);
});

app.delete('/:id', (req, res) => {
  foodsController.destroy(req, res);
})

module.exports = app;
