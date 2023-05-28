import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE commission (
      id VARCHAR(255) PRIMARY KEY DEFAULT (gen_random_uuid ()),
      status VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      referral_by VARCHAR(255) NOT NULL,
      commission NUMERIC(4,2) NOT NULL,
      modified_by INT,
      "createdAt" BIGINT NOT NULL,
      "updatedAt" BIGINT NOT NULL,

      UNIQUE(user_id),

      CONSTRAINT fk_referral
        FOREIGN KEY(referral_by) 
        REFERENCES users(id)
        ON DELETE SET NULL,

      CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE SET NULL
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table commission`);
}
