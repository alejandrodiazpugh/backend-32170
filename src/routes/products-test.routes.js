// ----------- IMPORTS ----------
import express from 'express';
import generateProducts from '../utils/FakerProducts.js';

// ---------- ROUTER ----------
const routerProductsTest = express.Router();

// ---------- FAKER PRODUCTS -----------

const fakeProducts = JSON.stringify(generateProducts(5));

// ---------- REST --------------------

routerProductsTest.get('/', (req, res) => {
	res.status(200).send(fakeProducts);
});

export default routerProductsTest;
