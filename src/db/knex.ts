import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
console.log(process.env.DATABASE_URL);

import Knex from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    // ssl: { rejectUnauthorized: false },
    connectionString: process.env.DATABASE_URL,
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN) || 5,
    max: parseInt(process.env.DB_POOL_MAX) || 5,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};
module.exports = {
  ...config,
};
