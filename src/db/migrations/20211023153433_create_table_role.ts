import Knex from 'knex';
import { ROLE } from '../../constant';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE role (
      id serial PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    INSERT into role(name)
    VALUES ('${ROLE.CUSTOMER}'),('${ROLE.ADMIN}');
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table role`);
}
