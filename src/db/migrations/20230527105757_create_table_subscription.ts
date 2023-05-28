import Knex from 'knex';
import { SUBSCRIPTION } from '../../constant';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE subscription (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price NUMERIC(4,2) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    INSERT into subscription(name, price)
    VALUES 
      ('${SUBSCRIPTION.TRIAL.name}', ${SUBSCRIPTION.TRIAL.price}),
      ('${SUBSCRIPTION.BASIC.name}', ${SUBSCRIPTION.BASIC.price}),
      ('${SUBSCRIPTION.PREMIUM.name}', ${SUBSCRIPTION.PREMIUM.price});
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table subscription`);
}
