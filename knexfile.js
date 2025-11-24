export default {
	development: {
		client: "better-sqlite3",
		connection: { filename: "../db/azformgen.db" },
		useNullAsDefault: true,
		migrations: {
			tableName: 'knex_migrations'
		}
	},
	dev_mariadb: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			charset: 'utf8mb4'
		},
		migrations: {
			directory: './migrations'
		},
		seeds: {
			directory: './seeds'
		}
	},
	production: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			charset: 'utf8mb4'
		},
		migrations: {
			directory: './migrations'
		},
		seeds: {
			directory: './seeds'
		}
	},
	production_mssql: {
		client: 'mssql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			requestTimeout: 30000,
			onnectionTimeout: 180000,  // for timeout setting
			options: {
				"encrypt": false,      // need to stop ssl checking in case of local db
				enableArithAbort: true,
				trustServerCertificate: true
			}
		},
		pool: { min: 0, max: 10 },
		migrations: { tableName: 'knex_migrations' }
	}
};