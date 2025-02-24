const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

pool.on('connect', () => {
  console.log('Connected to the database.');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
