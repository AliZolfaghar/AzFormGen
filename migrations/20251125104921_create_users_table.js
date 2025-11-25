import bcrypt from 'bcrypt';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('users', table => {
        // id is a uuid
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('name');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true); // created_at, updated_at
    }).then(() => {
        // Insert sample data
        return knex('users').insert(sampleData);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('users');
};

let sampleData = [
    { name: 'admin',  email: 'admin@local', password: bcrypt.hashSync('1234', 10) },
    { name: 'tester', email: 'tester@local', password: bcrypt.hashSync('1234', 10) }
];
