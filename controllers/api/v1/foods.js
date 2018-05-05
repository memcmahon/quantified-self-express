const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../../../models/api/v1/food');

const getFoods = (req, res) => {
  Food.all()
    .then((data) => {
      res.status(200).json(data.rows)
    })
}

const getFood = (req, res) => {
  Food.find(req.params["id"])
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
}

module.exports = {
  getFoods,
  getFood,
}
