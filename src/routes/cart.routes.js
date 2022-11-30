// ----------- IMPORTS ----------
import express from 'express';
import Contenedor from '../utils/Contenedor.js';

// ---------- ROUTER ----------
const routerCart = express.Router();
const cartApi = new Contenedor('./src/data/cart.json');
const productApi = new Contenedor('./src/data/products.json');

// ----- CREATE CART -----
routerCart.post('/', async (req, res) => {
	const cart = await cartApi.save(req.body);
	return res.status(201).send({
		code: 201,
		msg: `Carrito con id ${await cart[cart.length - 1]
			.id} creado con éxito`,
	});
});

// ----- DELETE CART -----
routerCart.delete('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const deleted = await cartApi.deleteById(id);
	if (deleted?.error) {
		return res.status(400).send({
			code: 400,
			msg: `Mala petición. No existe carrito con id ${id}`,
		});
	}
	return res.status(200).send({
		code: 200,
		msg: `Se ha eliminado con éxito el carrito con id ${id}.`,
	});
});

// ----- GET PRODUCTS IN CART -----
routerCart.get('/:id/productos', async (req, res) => {
	const id = parseInt(req.params.id);
	const cart = await cartApi.getById(id);
	return res.status(201).send(cart.productos);
});

// ----- POST PRODUCTS TO CART -----
routerCart.post('/:id/productos', async (req, res) => {
	const id = parseInt(req.params.id);
	const idToAdd = parseInt(req.body.id);
	const productToAdd = await productApi.getById(idToAdd);
	await cartApi.addToList(id, productToAdd);
	return res
		.status(201)
		.send({ code: 201, msg: `Se ha actualizado el carrito con id ${id}` });
});

// ----- DELETE PRODUCT FROM CART -----
routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
	const cartId = parseInt(req.params.id);
	const productId = parseInt(req.params.id_prod);
	const cart = await cartApi.getById(cartId);
	const itemToDelete = cart.productos.find((item) => item.id === productId);
	cart.productos.splice(cart.productos.indexOf(itemToDelete), 1);
	await cartApi.update(cartId, cart);
	return res.status(200).send({
		code: 200,
		msg: `Se ha actualizado el carrito con id ${cartId}, eliminando el elemento con id ${productId}`,
	});
});

export default routerCart;
