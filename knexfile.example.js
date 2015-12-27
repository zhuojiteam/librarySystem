// Update with your config settings.
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : '',
      password : '',
      database : ''
    },
    pool: {
      min: 2,
      max: 20
    },
    charset  : 'utf8'
  },

  staging: {
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : '',
      password : '',
      database : ''
    },
    pool: {
      min: 2,
      max: 20
    },
    charset  : 'utf8',
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : '',
      password : '',
      database : ''
    },
    pool: {
      min: 2,
      max: 20
    },
    charset  : 'utf8',
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
