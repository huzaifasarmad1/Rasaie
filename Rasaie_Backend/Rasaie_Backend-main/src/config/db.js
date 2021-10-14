// Database adapter file

// Require straight to controllers
console.log(process.env.PGUser);
console.log(process.env.PGHost);
console.log(process.env.PGDatabase);
console.log(process.env.PGPort);
console.log(process.env.PORT)
const { Pool } = require('pg');

// const pool = new Pool();
const pool = new Pool(
  // (process.env.postgres_url);
  {
    user: process.env.PGUser || '',
    host: process.env.PGHost || '',
    database: process.env.PGDatabase || '',
    password: process.env.PGPassword || '',
    port: process.env.PGPort || '5432',
    evictionRunIntervalMillis: 1,
    idleTimeoutMillis: 1000,
    ssl: { rejectUnauthorized: false }
  },
);
pool.on('error', (err) => {
  console.error('Error in pg. ->', err.stack);
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('asdsada')
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
