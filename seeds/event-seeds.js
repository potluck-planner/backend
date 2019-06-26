
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('event').insert([
        {colName: 'rowValue1'},
        {colName: 'rowValue2'},
        {colName: 'rowValue3'}
      ]);
    });
};
