import { generateString } from './StringGenerator.js';
import knex from 'knex';

export default class ContenedorSQL {
	constructor(config, table) {
		this.database = knex(config);
		this.table = table;
	}

	static timestamp() {
		let date = new Date();
		return `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()} ${date.toTimeString().split(' ')[0]}`;
	}

	static generateCode(id) {
		let string = generateString(5);
		let random = Math.floor(1000 + Math.random() * 9000);
		return `${string}-${id}-${random}`;
	}

	async getAll() {
		return await this.database.select('').from(this.table);
	}

	getById(queryId) {
		return this.database
			.select()
			.from(this.table)
			.where('id', parseInt(queryId));
	}

	async save(item) {
		const id = await this.database(this.table).insert(item, ['id']);
	}

	async update(queryId, queryItem) {
		await this.database(this.table).where('id', queryId).update(queryItem);
	}

	async deleteById(queryId) {
		await this.database(this.table).where('id', queryId).del();
		return;
	}
	async deleteAll() {
		await this.database(this.table).del();
		return;
	}
}
