exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
  .then(() => {
    return Promise.all([
      knex.raw('INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
      ["Breakfast", new Date, new Date]),

      knex.raw('INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
      ["Lunch", new Date, new Date]),

      knex.raw('INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
      ["Snacks", new Date, new Date]),

      knex.raw('INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
      ["Dinner", new Date, new Date])
    ])
  })
}
