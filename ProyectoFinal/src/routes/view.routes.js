import express from 'express';
import Contenedor from '../utils/Contenedor.js';

const products = new Contenedor('./src/data/products.json');
const productsToDisplay = await products.getAll();

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
	res.render('index', { products: productsToDisplay });
});

export default viewsRouter;
