const express = require('express');
const routerForm = express.Router();
const products = require('../data/products.json');
const fs = require('fs');

// Router

routerForm.get('/', (req, res) => {
	res.render('index', { products });
});

routerForm.post('/productos', (req, res) => {
	try {
		const productList = products;
		console.log(productList);
		const { titulo, precio, url } = req.body;
		let id = productList.length + 1;
		const newProduct = { titulo, precio, url, id };
		productList.push(newProduct);
		fs.promises.writeFile(
			'./src/data/products.json',
			JSON.stringify(productList)
		);
		res.redirect('/productos');
	} catch (error) {
		console.log('Error al guardar producto: ' + error);
	}
});

module.exports = routerForm;
