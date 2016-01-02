
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('authors').del(),

    // Inserts seed entries
    knex('authors').insert({
      id: 1,
      name: '张大爷'
    })
  );
};
