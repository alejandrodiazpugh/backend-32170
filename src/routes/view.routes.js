import express from 'express';
import { mysqlConnection } from '../config/mysqlConnection.js';
import ContenedorSQL from '../utils/ContenedorSQL.js';
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



const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
	res.render('index');
});

viewsRouter.get('/carrito', async (req, res) => {
	res.render('cart', { cart: cartToDisplay.productos });
});

viewsRouter.get('/admin', adminAuth, async (req, res) => {
	res.render('admin');
});

export default viewsRouter;
