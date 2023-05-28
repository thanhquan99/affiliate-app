import Knex from 'knex';
import { ROLE } from '../../constant';

export async function up(knex: Knex): Promise<void> {
  const now = Math.round(new Date().getTime() / 1000);
  await knex.raw(`
    CREATE TABLE role (
      id VARCHAR(255) PRIMARY KEY DEFAULT (gen_random_uuid ()),
      name VARCHAR(255) NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );

    INSERT into role(name,created_at,updated_at)
    VALUES ('${ROLE.CUSTOMER}',${now}, ${now}),('${ROLE.ADMIN}', ${now}, ${now});
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table role`);
}
