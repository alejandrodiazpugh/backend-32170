import fs from 'fs';
import { generateString } from './StringGenerator.js';

export default class Contenedor {
	constructor(path) {
		this.path = path;
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
		try {
			const items = await fs.promises.readFile(this.path, 'utf-8');
			return JSON.parse(items);
		} catch (error) {
			console.log('Error al obtener elemento: ' + error);
		}
	}
	async getById(queryId) {
		try {
			const items = await this.getAll();
			const itemToGet = items.find((Item) => Item.id === queryId);
			if (itemToGet === undefined) {
				return { error: 'elemento no encontrado' };
			}
			return itemToGet;
		} catch (error) {
			console.log('Error al obtener elemento: ' + error);
		}
	}
	async save(item) {
		try {
			const items = await this.getAll();
			let id = items.length + 1;
			const timestamp = Contenedor.timestamp();
			let newItem;
			if (!item.titulo) {
				newItem = { ...item, timestamp, id };
			} else {
				const code = Contenedor.generateCode(id);
				newItem = { ...item, codigo: code, timestamp, id };
			}
			items.push(newItem);
			fs.promises.writeFile(this.path, JSON.stringify(items));
			return items;
		} catch (error) {
			console.log('Error al guardar contenido: ' + error);
		}
	}

	async update(queryId, queryItem) {
		try {
			const items = await this.getAll();
			const itemToChange = items.find((item) => item.id === queryId);
			if (itemToChange === undefined) {
				return { error: 'Elemento no encontrado' };
			}
			const timestamp = Contenedor.timestamp();
			const code = Contenedor.generateCode(queryId);
			console.log(code);
			const updatedItem = {
				...queryItem,
				codigo: code,
				timestamp,
				id: queryId,
			};
			items.splice(items.indexOf(itemToChange), 1, updatedItem);
			fs.promises.writeFile(this.path, JSON.stringify(items));
			return updatedItem;
		} catch (error) {
			console.log(`Error al actualizar el elemento: ${error}`);
		}
	}

	async deleteById(queryId) {
		try {
			const items = await this.getAll();
			if (items.length < queryId) {
				return { error: 'elemento no encontrado' };
			}
			items.splice(queryId - 1, 1);
			fs.promises.writeFile(this.path, JSON.stringify(items));
		} catch (error) {
			console.log('Error al borrar elemento: ' + error);
		}
	}

	async addToList(idOfContainer, product) {
		try {
			const items = await this.getAll();
			const containerToFind = items.find(
				(container) => container.id === idOfContainer
			);
			if (containerToFind === undefined) {
				// Si no existe el carrito lo crea
				await this.save({ productos: [] });
				const id = idOfContainer;
				const itemToSend = product;
				return await this.addToList(id, itemToSend); // recursion
			}
			containerToFind.productos.push(product);
			items.splice(items.indexOf(containerToFind), 1, containerToFind);
			fs.promises.writeFile(this.path, JSON.stringify(items));
			return containerToFind;
		} catch (error) {
			console.log('Error al agregar elemento: ' + error);
		}
	}
}
