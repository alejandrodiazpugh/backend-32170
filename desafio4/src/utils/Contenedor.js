//@ts-check
const fs = require('fs');

class Contenedor {
	constructor(path) {
		this.path = path;
	}

	async getAll() {
		try {
			const products = await fs.promises.readFile(this.path, 'utf-8');
			return JSON.parse(products);
		} catch (error) {
			console.log('Error al obtener productos: ' + error);
		}
	}
	async getById(queryId) {
		try {
			const products = await this.getAll();
			const productToGet = products.find(
				(product) => product.id === queryId
			);
			if (productToGet === 'undefined') {
				return { error: 'Producto no encontrado' };
			}
			return productToGet;
		} catch (error) {
			console.log('Error al obtener producto: ' + error);
		}
	}
	async save(product) {
		try {
			const products = await this.getAll();
			let id = products.length + 1;
			const newProduct = { ...product, id };
			products.push(newProduct);
			fs.promises.writeFile(this.path, JSON.stringify(products));
			return products;
		} catch (error) {
			console.log('Error al guardar producto: ' + error);
		}
	}

	async update(queryId, queryProduct) {
		try {
			const products = await this.getAll();
			const productToChange = await this.getById(queryId);
			const updatedProduct = { ...queryProduct, id: queryId };
			products.splice(products.indexOf(productToChange), updatedProduct);
			fs.promises.writeFile(this.path, JSON.stringify(products));
			return updatedProduct;
		} catch (error) {
			console.log(`Error al actualizar el producto: ${error}`);
		}
	}

	async deleteById(queryId) {
		try {
			const products = await this.getAll();
			const indexToDelete = products.indexOf(await this.getById(queryId));
			products.splice(indexToDelete, 1);
			fs.promises.writeFile(this.path, JSON.stringify(products));
			return true;
		} catch (error) {
			console.log('Error al borrar producto: ' + error);
		}
	}
}

exports.Contenedor = Contenedor;
