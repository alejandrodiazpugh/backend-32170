import ContenedorMongo from '../../containers/ContenedorMongo.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_LOGIN = process.env.MONGO_CREDENTIALS;

export const productSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true },
		titulo: { type: String, required: true, max: 100 },
		descripcion: { type: String, required: true, max: 1000 },
		url: { type: String, required: true },
		precio: { type: Number, required: true },
		stock: { type: Number, required: true },
	},
	{ timestamps: true }
);

const mongoProductModel = mongoose.model('productos', productSchema);

class ProductosDaoMongo extends ContenedorMongo {
	constructor() {
		super(MONGO_LOGIN, mongoProductModel);
	}
}

export default ProductosDaoMongo;
