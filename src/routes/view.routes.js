import express from 'express';
import { DAO } from '../DAO/index.js';
import { adminVerification } from '../utils/Verification.js';

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


const DAOProducts = DAO.productos;
const DAOCart = DAO.carrito;
const products = new DAOProducts();
const cart = new DAOCart();
const productsToDisplay = await products.getAll();
const cartToDisplay = await cart.getById(1);

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
	res.render('index', { products: productsToDisplay });
});

viewsRouter.get('/carrito', async (req, res) => {
	res.render('cart', { cart: cartToDisplay.products });
});

viewsRouter.get('/admin', adminAuth, async (req, res) => {
	res.render('admin', { products: productsToDisplay });
});

export default viewsRouter;
