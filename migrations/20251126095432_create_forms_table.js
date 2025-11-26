/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    // create table 
    return knex.schema.createTable('forms', table => {        
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('formName').notNullable();
        // is active 
        table.boolean('isActive').notNullable().defaultTo(true);
        // target table 
        table.string('targetTable').notNullable();        
        table.timestamps(true, true); // created_at, updated_at
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('forms');
};
