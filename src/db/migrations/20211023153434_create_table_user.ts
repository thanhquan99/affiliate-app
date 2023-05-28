import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE users (
      id VARCHAR(255) PRIMARY KEY DEFAULT (gen_random_uuid ()),
      role_id VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      affiliate_code VARCHAR(255) NOT NULL,
      referral_by VARCHAR(255),
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL,

      UNIQUE(email),
      UNIQUE(affiliate_code),

      CONSTRAINT fk_referral
        FOREIGN KEY(referral_by) 
        REFERENCES users(id)
        ON DELETE SET NULL,
      
      CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES role(id)
        ON DELETE SET NULL
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table users`);
}
