const {Pool} = require('pg');

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sistema_taquilla',
  password: 'Val2006',
  port: 5432,
});
module.exports = db;