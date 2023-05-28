import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE user_subscription (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      subscription_id INT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(user_id),

      CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,

      CONSTRAINT fk_subscription
        FOREIGN KEY(subscription_id) 
        REFERENCES subscription(id)
        ON DELETE SET NULL
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table user_subscription`);
}
