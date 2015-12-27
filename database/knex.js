var knex = require('knex')(require('../knexfile').production);

module.exports = knex;