exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
  .then(function () {
    return Promise.all([
      knex.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
      ["Bananas", 35, new Date, new Date]),

      knex.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES(?, ?, ?, ?)',
      ["Oranges", 40, new Date, new Date])
    ])
  })
}
