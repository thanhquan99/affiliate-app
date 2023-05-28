import Knex from 'knex';
import { SUBSCRIPTION } from '../../constant';

export async function up(knex: Knex): Promise<void> {
  const now = Math.round(new Date().getTime() / 1000);
  await knex.raw(`
    CREATE TABLE subscription (
      id VARCHAR(255) PRIMARY KEY DEFAULT (gen_random_uuid ()),
      name VARCHAR(255) NOT NULL,
      price NUMERIC(4,2) NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );

    INSERT into subscription(name, price, created_at, updated_at)
    VALUES 
      ('${SUBSCRIPTION.TRIAL.name}', ${SUBSCRIPTION.TRIAL.price}, ${now}, ${now}),
      ('${SUBSCRIPTION.BASIC.name}', ${SUBSCRIPTION.BASIC.price}, ${now}, ${now}),
      ('${SUBSCRIPTION.PREMIUM.name}', ${SUBSCRIPTION.PREMIUM.price}, ${now}, ${now});
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table subscription`);
}
