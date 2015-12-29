exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('categories').del(),

        // Inserts seed entries
        knex('categories').insert({char: 'A', name: '马列主义、毛泽东思想、邓小平理论'}),
        knex('categories').insert({char: 'B', name: '哲学、宗教'}),
        knex('categories').insert({char: 'C', name: '社会科学总论'}),
        knex('categories').insert({char: 'D', name: '政治、法律'}),
        knex('categories').insert({char: 'E', name: '军事'}),
        knex('categories').insert({char: 'F', name: '经济'}),
        knex('categories').insert({char: 'G', name: '文化、科学、教育、体育'}),
        knex('categories').insert({char: 'H', name: '语言、文字'}),
        knex('categories').insert({char: 'I', name: '文学'}),
        knex('categories').insert({char: 'J', name: '艺术'}),
        knex('categories').insert({char: 'K', name: '历史、地理'}),
        knex('categories').insert({char: 'N', name: '自然科学总论'}),
        knex('categories').insert({char: 'O', name: '数理科学与化学'}),
        knex('categories').insert({char: 'P', name: '天文学、地球科学'}),
        knex('categories').insert({char: 'Q', name: '生物科学'}),
        knex('categories').insert({char: 'R', name: '医药、卫生'}),
        knex('categories').insert({char: 'S', name: '农业科学'}),
        knex('categories').insert({char: 'T', name: '工业技术'}),
        knex('categories').insert({char: 'U', name: '交通运输'}),
        knex('categories').insert({char: 'V', name: '航空、航天'}),
        knex('categories').insert({char: 'X', name: '环境科学,安全科学'}),
        knex('categories').insert({char: 'Z', name: '综合性图书'})
    );
};
