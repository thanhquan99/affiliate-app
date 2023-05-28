import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE commission (
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) NOT NULL,
      user_id INT NOT NULL,
      referral_by INT NOT NULL,
      commission NUMERIC(4,2) NOT NULL,
      modified_by INT,
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(user_id),

      CONSTRAINT fk_referral
        FOREIGN KEY(referral_by) 
        REFERENCES users(id)
        ON DELETE SET NULL
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP table commission`);
}
