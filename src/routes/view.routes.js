import express from 'express';
import Contenedor from '../utils/Contenedor.js';
import ProductosDaoMongo from '../DAO/productos/ProductosDaoMongo.js';
import { adminVerification } from '../utils/Verification.js';
import CarritoDaoMongo from '../DAO/carritos/CarritoDaoMongo.js';

//ADMIN AUTH
const isAdmin = adminVerification.isAdmin;
const adminAuth = (req, res, next) => {
	!isAdmin
		? res.status(403).json({
				code: 403,
				msg: `Forbidden ${req.method} ${req.baseUrl}${req.url}`,
		  })
		: next();
};

// const products = new Contenedor('./src/data/products.json');
const products = new ProductosDaoMongo();
const cart = new CarritoDaoMongo();
const productsToDisplay = await products.getAll();
const cartToDisplay = await cart.getById(1);

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
	res.render('index', { products: productsToDisplay });
});

viewsRouter.get('/carrito', async (req, res) => {
	res.render('cart', await { cart: cartToDisplay.productos });
});

viewsRouter.get('/admin', adminAuth, async (req, res) => {
	res.render('admin', { products: productsToDisplay });
});

export default viewsRouter;
