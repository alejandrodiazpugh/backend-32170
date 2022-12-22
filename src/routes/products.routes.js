//@ts-check

// ----------- IMPORTS ----------
import express from 'express';
import Contenedor from '../utils/Contenedor.js';
import ProductosDaoMongo from '../DAO/productos/ProductosDaoMongo.js';
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
// const productsApi = new Contenedor('./src/data/products.json');
const productsApi = new ProductosDaoMongo();

//---------- GET PRODUCTS ------------
routerProducts.get('/', async (req, res) => {
	res.status(200).send(await productsApi.getAll());
});

routerProducts.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	res.status(200).send(await productsApi.getById(id));
});

// //---------- POST PRODUCT ------------

routerProducts.post('/', adminAuth, (req, res) => {
	productsApi.save(req.body);
	return res.status(201).send({
		code: 201,
		msg: `Producto '${req.body.titulo}' guardado con éxito`,
	});
});

// //---------- PUT PRODUCT ------------

routerProducts.put('/:id', adminAuth, async (req, res) => {
	const id = parseInt(req.params.id);
	await productsApi.update(id, req.body);
	return res.status(200).send({
		code: 200,
		msg: `Se ha modificado el contenido del producto con id ${id}`,
	});
});

// //---------- DELETE PRODUCT ------------
routerProducts.delete('/:id', adminAuth, async (req, res) => {
	const id = parseInt(req.params.id);
	const deleted = await productsApi.deleteById(id);
	if (deleted?.error) {
		return res.status(400).send({
			code: 400,
			msg: `Mala petición. No existe producto con id ${id}`,
		});
	}
	res.status(200).send({
		code: 200,
		msg: `Se ha eliminado con éxito el producto con id ${id}.`,
	});
});

export default routerProducts;
