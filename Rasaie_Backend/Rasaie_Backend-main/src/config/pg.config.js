const {Pool} = require('pg');

console.log(process.env.PGUser);
console.log(process.env.PGHost);
console.log(process.env.PGDatabase);
console.log(process.env.PGPort);

const pool = new Pool(
  // (process.env.postgres_url);
  {
    user: process.env.PGUser,
    host: process.env.PGHost,
    database: process.env.PGDatabase,
    password: process.env.PGPassword,
    port: process.env.PGPort,
    evictionRunIntervalMillis: 1,
    idleTimeoutMillis: 1000,
  },
);

pool.on('error', (err) => {
  console.error('Error in pg. ->', err.stack);
});

module.exports = pool;
