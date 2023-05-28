import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE transaction (
      id VARCHAR(255) PRIMARY KEY DEFAULT (gen_random_uuid ()),
      status VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      subscription JSONB NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL,

      CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table transaction`);
}
