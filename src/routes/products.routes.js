//@ts-check

// ----------- IMPORTS ----------
import express from 'express';
import { mysqlConnection } from '../../config/mysqlConnection.js';
import ContenedorSQL from '../utils/ContenedorSQL.js';
import { adminVerification } from '../utils/Verification.js';

// ---------- ADMIN AUTH ----------
const isAdmin = adminVerification.isAdmin;
const adminAuth = (req, res, next) => {
	!isAdmin
		? res.status(403).json({
				code: 403,
				msg: `Forbidden ${req.method} ${req.baseUrl}${req.url}`,
		  })
		: next();
};

// ---------- ROUTER ----------
const routerProducts = express.Router();
const productsApi = new ContenedorSQL(mysqlConnection, 'productos');

//---------- GET PRODUCTS ------------
routerProducts.get('/', async (req, res) => {
	res.status(200).send(await productsApi.getAll());
});

routerProducts.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	if (id) {
		res.status(200).send(await productsApi.getById(id));
	}
});

//---------- POST PRODUCT ------------

routerProducts.post('/', adminAuth, (req, res) => {
	productsApi.save(req.body);
	return res.status(201).send({
		code: 201,
		msg: `Producto '${req.body.titulo}' guardado con éxito`,
	});
});

//---------- PUT PRODUCT ------------

routerProducts.put('/:id', adminAuth, async (req, res) => {
	const id = parseInt(req.params.id);
	if (id) {
		await productsApi.update(id, req.body);
	}
	res.json({ msg: `ID ${id} updated successfully` });
});

//---------- DELETE PRODUCT ------------
routerProducts.delete('/:id', adminAuth, async (req, res) => {
	const id = parseInt(req.params.id);
	if (id) {
		await productsApi.deleteById(id);
	}
	res.json({ msg: `ID ${id} deleted successfully.` });
});

export default routerProducts;
