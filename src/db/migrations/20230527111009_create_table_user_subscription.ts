import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE user_subscription (
      id VARCHAR(255) PRIMARY KEY DEFAULT (gen_random_uuid ()),
      user_id VARCHAR(255) NOT NULL,
      subscription_id VARCHAR(255) NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL,

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
