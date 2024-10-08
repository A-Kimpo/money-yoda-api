import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('transactions').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('wallet_id').unsigned();
        table.foreign('wallet_id').references('wallets.id');
        table.string('type', 10).notNullable().checkIn(['income', 'expense']);
        table.decimal('amount', 10, 2).notNullable();
        table.text('tag');
        table.text('category');
        table.text('description');
        table.timestamp('date_added').defaultTo(knex.fn.now());
        table.timestamp('date_modified').defaultTo(knex.fn.now());
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions');
}
