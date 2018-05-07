const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../../../models/api/v1/food');

const index = (req, res) => {
  Food.all()
    .then((data) => {
      res.status(200).json(data.rows)
    })
};

const show = (req, res) => {
  Food.find(req.params.id)
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
};

const create = (req, res) => {
  Food.create(req.body.food.name, req.body.food.calories)
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
};

const update = (req, res) => {
  Food.update(req.params.id, req.body.food.name, req.body.food.calories)
    .then((data) => {
      res.status(200).json(data.rows[0])
    })
};

const destroy = (req, res) => {
  Food.destroy(req.params.id)
    .then((data) => {
      res.sendStatus(204)
    })
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
