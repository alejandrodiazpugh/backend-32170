//@ts-check
// ----------- IMPORTS ----------
const express = require('express');
const fs = require('fs');
const { Contenedor } = require('../utils/Contenedor.js');

// ---------- ROUTER ----------
const routerProducts = express.Router();
const productsApi = new Contenedor('./desafio4/src/data/products.json');

//---------- GET PRODUCTS ------------
routerProducts.get('/', async (req, res) => {
	res.status(200).send(await productsApi.getAll());
});

routerProducts.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	res.status(200).send(await productsApi.getById(id));
});

//---------- POST PRODUCT ------------

routerProducts.post('/', (req, res) => {
	productsApi.save(req.body);
	return res.status(201).send({
		code: 201,
		msg: `Producto '${req.body.titulo}' guardado con éxito`,
	});
});

//---------- PUT PRODUCT ------------

routerProducts.put('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const updated = await productsApi.update(id, req.body);
	if (updated.id === 'undefined') {
		return res.status(400).send({
			code: 400,
			msg: `Mala petición. No existe producto con id ${id}`,
		});
	}
	return res.status(200).send({
		code: 200,
		msg: `Se ha modificado el contenido del producto ${req.body.titulo} con id ${id}`,
	});
});

//---------- DELETE PRODUCT ------------
routerProducts.delete('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await productsApi.deleteById(id);
	res.status(200).send({
		code: 200,
		msg: `Se ha eliminado con éxito el producto con id ${id}.`,
	});
});
module.exports = routerProducts;
