import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE transaction (
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) NOT NULL,
      user_id INT NOT NULL,
      subscription JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
