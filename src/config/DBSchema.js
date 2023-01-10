import mongoose from 'mongoose';
import { normalize, denormalize, schema } from 'normalizr';

export const MONGO_LOGIN = process.env.MONGO_CREDENTIALS;

new mongoose.Schema({
	author: {
		id: { type: String, required: true },
		nombre: { type: String, required: true },
		apellido: { type: String, required: true },
		edad: { type: Number, required: true },
		alias: { type: String, required: true },
		avatar: { type: String, required: true },
	},
	text: { type: String, required: true },
});

// ----- NORMALIZR SCHEMA -----
const authorSchema = new schema.Entity('authors');
const textSchema = new schema.Entity('text');

const messageSchema = new schema.Entity('text', {
	author: authorSchema,
	texts: [textSchema],
});

console.log(normalize(message, text));
