import mongoose from 'mongoose';
import { normalize, denormalize, schema } from 'normalizr';
import * as dotenv from 'dotenv';

dotenv.config();
export const MONGO_LOGIN = process.env.MONGO_CREDENTIALS;

const mongoMessageSchema = new mongoose.Schema({
	author: {
		email: { type: String, required: true },
		nombre: { type: String, required: true },
		apellido: { type: String, required: true },
		edad: { type: Number, required: true },
		alias: { type: String, required: true },
		avatar: { type: String, required: true },
	},
	date: { type: String, required: true },
	text: { type: String, required: true },
});

// // ----- NORMALIZR SCHEMA -----
const emailSchema = new schema.Entity('email');
const nombreSchema = new schema.Entity('nombre');
const apellidoSchema = new schema.Entity('apellido');
const edadSchema = new schema.Entity('edad');
const aliasSchema = new schema.Entity('alias');
const avatarSchema = new schema.Entity('email');

const authorSchema = new schema.Entity(
	'author',
	{
		email: emailSchema,
		nombre: nombreSchema,
		apellido: apellidoSchema,
		edad: edadSchema,
		alias: aliasSchema,
		avatar: avatarSchema,
	},
	{ idAttribute: 'email' }
);

const textSchema = new schema.Entity('text');

export const normalizeMessageSchema = new schema.Entity(
	'message',
	{
		email: emailSchema,
		author: authorSchema,
		text: [textSchema],
	},
	{ idAttribute: 'email' }
);

export const mongoModel = mongoose.model('mensajes', mongoMessageSchema);
