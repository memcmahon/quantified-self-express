
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function(t) {
      t.increments();
      t.string('name');
      t.integer('calories');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('foods')
  ])
};
