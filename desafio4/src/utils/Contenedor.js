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
			if (productToGet === undefined) {
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
			const productToChange = products.find(
				// Intente hacer que funcionara llamando this.getById, pero no servia
				(product) => product.id === queryId
			);
			if (productToChange === undefined) {
				return { error: 'Producto no encontrado' };
			}
			const updatedProduct = { ...queryProduct, id: queryId };
			products.splice(
				products.indexOf(productToChange),
				1,
				updatedProduct
			);
			fs.promises.writeFile(this.path, JSON.stringify(products));
			return updatedProduct;
		} catch (error) {
			console.log(`Error al actualizar el producto: ${error}`);
		}
	}

	async deleteById(queryId) {
		try {
			const products = await this.getAll();
			if (products.length < queryId) {
				return { error: 'Producto no encontrado' };
			}
			products.splice(queryId - 1, 1);
			fs.promises.writeFile(this.path, JSON.stringify(products));
		} catch (error) {
			console.log('Error al borrar producto: ' + error);
		}
	}
}

exports.Contenedor = Contenedor;
