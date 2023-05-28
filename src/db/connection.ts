import knex from 'knex';

const knexInstance = knex({
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
    directory: 'migrations',
  },
});

export default knexInstance;

// knexInstance.migrate
//   .rollback({
//     directory: 'src/db/migrations',
//     tableName: 'knex_migrations',
//   })
//   .then((result) => {
//     console.log(result);
//   });

// knexInstance.migrate
//   .latest({
//     directory: 'src/db/migrations',
//     tableName: 'knex_migrations',
//   })
//   .then((result) => {
//     console.log(result);
//   });
