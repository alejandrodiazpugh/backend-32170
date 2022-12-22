import ContenedorMongo from '../../containers/ContenedorMongo.js';
import { productSchema } from '../productos/ProductosDaoMongo.js';
import mongoose from 'mongoose';

const MONGO_LOGIN =
	process.env.MONGO_CREDENTIALS ||
	'mongodb+srv://alejandroDiazPugh:coderhouse32170@cluster0.bdfsg9u.mongodb.net/?retryWrites=true&w=majority';

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
	async addToCart(query, data, cartId) {
		try {
			this.connect();
			const id = parseInt(query);
			const cart = await this.getById(cartId);
			const products = cart.products;
			const newProducts = [...products, data];
			cart.products = newProducts;
			return await this.update(id, cart);
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
			if (indexToRemove === -1) {
				throw new Error('El producto no está presente en el carrito');
			}
			cart.products.splice(indexToRemove, 1);
			const newCart = [...cart.products];
			console.log({ newCart: newCart });
			return await this.update(cartId, newCart);
		} catch (err) {
			console.error(`Error al borrar elemento del carrito: ${err}`);
		}
	}
}

export default CarritoDaoMongo;
