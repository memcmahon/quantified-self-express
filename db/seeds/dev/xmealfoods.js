exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY')
  .then(function () {
    return Promise.all([
      knex.raw('INSERT INTO mealfoods (meal_id, food_id, created_at, updated_at) VALUES (?, ?, ?, ?)',
      ["1", "1", new Date, new Date]),

      knex.raw('INSERT INTO mealfoods (meal_id, food_id, created_at, updated_at) VALUES(?, ?, ?, ?)',
      ["1", "2", new Date, new Date])
    ])
  })
}
