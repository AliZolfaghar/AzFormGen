import knex from 'knex';
import knexfile from './knexfile.js';
import { attachPaginate } from 'knex-paginate';
console.log('DATABASE ENV : ', process.env.NODE_ENV );

const db = knex(knexfile[process.env.NODE_ENV ]);
attachPaginate();
console.log("DATABASE Client :" , db.client.config.client);
export default db;