exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),

        // Inserts seed entries
        knex('users').insert({
            id: 1,
            name: '小明',
            email: 'xiaoming@lulucici.me',
            password: '$2a$10$NwCM5zI1CGGt4RYJMb6wteKqzXQH81lk1pqJge.w.hWA5STny1SPS',
            permission: 1
        }),
        knex('users').insert({
            id: 2,
            name: '小芳',
            email: 'xiaofang@lulucici.me',
            password: '$2a$10$NwCM5zI1CGGt4RYJMb6wteKqzXQH81lk1pqJge.w.hWA5STny1SPS',
            permission: 0
        }),
        knex('users').insert({
            id: 3,
            name: '小华',
            email: 'xiaohua@lulucici.me',
            password: '$2a$10$NwCM5zI1CGGt4RYJMb6wteKqzXQH81lk1pqJge.w.hWA5STny1SPS',
            permission: 0
        }),
        knex('users').insert({
            id: 4,
            name: '小红',
            email: 'xiaohong@lulucici.me',
            password: '$2a$10$NwCM5zI1CGGt4RYJMb6wteKqzXQH81lk1pqJge.w.hWA5STny1SPS',
            permission: 1
        }),
        knex('users').insert({
            id: 5,
            name: '小丽',
            email: 'xiaoli@lulucici.me',
            password: '$2a$10$NwCM5zI1CGGt4RYJMb6wteKqzXQH81lk1pqJge.w.hWA5STny1SPS',
            permission: 0
        }),
        knex('users').insert({
            id: 6,
            name: '小李子',
            email: 'xiaolizi@lulucici.me',
            password: '$2a$10$NwCM5zI1CGGt4RYJMb6wteKqzXQH81lk1pqJge.w.hWA5STny1SPS',
            permission: 0
        }),
    );
};
