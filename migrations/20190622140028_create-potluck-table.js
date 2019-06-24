exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', function(table) {
    table.increments();
    table
      .string('username', 20)
      .unique()
      .notNullable();
    table.string('password', 25).notNullable();
  });

  await knex.schema.createTable('event', function(table) {
    table.increments('event_id');
    table.string('event_name', 50).notNullable();
    table.string('description', 500);
    table
      .integer('organizer_id')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.date('date').notNullable();
    table.time('time').notNullable();
  });

  await knex.schema.createTable('location', function(table) {
    table
      .integer('event_id')
      .references('event.event_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('address', 50).notNullable();
    table.string('city', 50).notNullable();
    table.string('state', 50).notNullable();
  });

  await knex.schema.createTable('potluck_guest', function(table) {
    table
      .string('username')
      .references('users.username')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('event_id')
      .references('event.event_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .boolean('going')
      .defaultTo(null)
  });

  await knex.schema.createTable('event_food_list', function(table) {
    table
      .integer('event_id')
      .references('event.event_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table.string('recipe_name').notNullable();
    table.integer('quantity').defaultTo(1);
    table
      .string('guest_name')
      .references('users.username')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(null);
    table.boolean('being_brought').defaultTo(false);
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('event');
  await knex.schema.dropTableIfExists('location');
  await knex.schema.dropTableIfExists('potluck_guest');
  await knex.schema.dropTableIfExists('food');
  await knex.schema.dropTableIfExists('event_food_list');
};