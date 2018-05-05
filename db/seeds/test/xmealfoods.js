exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY CASCADE')
  .then(function () {
    return Promise.all([
      knex.raw('INSERT INTO mealfoods (food_id, meal_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
      [1, 1, new Date, new Date]),

      knex.raw('INSERT INTO mealfoods (food_id, meal_id, created_at, updated_at) VALUES(?, ?, ?, ?)',
      [2, 1, new Date, new Date])
    ])
  })
}
