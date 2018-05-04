
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals', function(t) {
      t.increments();
      t.string('name');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals')
  ])
};
