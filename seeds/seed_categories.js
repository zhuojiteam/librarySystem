
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(),

    // Inserts seed entries
    knex('categories').insert({char: 'A', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'B', name: '哲学、宗教'}),
    knex('categories').insert({char: 'C', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'D', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'E', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'F', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'G', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'H', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'I', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'J', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'K', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'L', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'M', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'N', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'O', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'P', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'Q', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'R', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'S', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'T', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'U', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'V', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'W', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'X', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'Y', name: '马列主义、毛泽东思想、邓小平理论'}),
    knex('categories').insert({char: 'Z', name: '马列主义、毛泽东思想、邓小平理论'})
  );
};
