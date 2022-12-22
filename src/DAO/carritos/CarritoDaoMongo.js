//@ts-check
import ContenedorMongo from '../../containers/ContenedorMongo.js';
import { productSchema } from '../productos/ProductosDaoMongo.js';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_LOGIN = process.env.MONGO_CREDENTIALS;

const cartSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true },
		products: [productSchema],
	},
	{ timestamps: true }
);

const mongoCartModel = mongoose.model('carrito', cartSchema);

class CarritoDaoMongo extends ContenedorMongo {
	constructor() {
		super(MONGO_LOGIN, mongoCartModel);
	}
	async addToCart(data, cartId) {
		try {
			this.connect();
			const cart = await this.getById(cartId);
			cart.products.push(data);
			console.log(cart);
			await cart.save();
		} catch (err) {
			console.error(`Error al agregar a carrito: ${err}`);
		}
	}

	async removeFromCart(query, cartId) {
		try {
			this.connect();
			const cart = await this.getById(cartId);
			const productToRemove = cart.products.find(
				(product) => product.id === query
			);
			const indexToRemove = cart.products.indexOf(productToRemove);
			cart.products.splice(indexToRemove, 1);
			await cart.save();
		} catch (err) {
			console.error(`Error al borrar elemento del carrito: ${err}`);
		}
	}
}

export default CarritoDaoMongo;
