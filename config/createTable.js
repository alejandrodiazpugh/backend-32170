import knex from 'knex';
import { mysqlConnection } from './mysqlConnection.js';
import { sqliteConnection } from './sqliteConnection.js';

const createProductTable = async () => {
	try {
		const database = knex(mysqlConnection);
		await database.schema.dropTableIfExists('productos');
		await database.schema.createTable('productos', (table) => {
			table.increments('id').primary();
			table.string('titulo', 120).notNullable();
			table.float('precio', 15).notNullable();
			table.string('descripcion', 255).notNullable();
			table.string('url', 255).notNullable();
			table.float('stock', 10).notNullable();
		});
		console.log('TABLE productos created');
	} catch (err) {
		console.log('TABLE productos Error:', err);
	}
};

const createMessageTable = async () => {
	try {
		const database = knex(sqliteConnection);
		await database.schema.dropTableIfExists('mensajes');
		await database.schema.createTable('mensajes', (table) => {
			table.increments('id').primary();
			table.string('email', 50).notNullable();
			table.string('text', 255).notNullable();
			table.timestamps();
		});
		console.log('TABLE mensajes created');
	} catch (err) {
		console.log('TABLE mensajes Error:', err);
	}
};

const createTables = async () => {
	await createProductTable();
	await createMessageTable();
};

createTables();
