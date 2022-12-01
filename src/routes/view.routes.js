import express from "express";
import Contenedor from "../utils/Contenedor.js";
import {adminVerification} from '../utils/Verification.js'

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

const products = new Contenedor("./src/data/products.json");
const cart = new Contenedor('./src/data/cart.json')
const productsToDisplay = await products.getAll();
const cartToDisplay = await cart.getById(1);

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
  res.render("index", { products: productsToDisplay });
});

viewsRouter.get("/carrito", async (req, res) => {
res.render("cart", { cart: cartToDisplay.productos });
});

viewsRouter.get('/admin', adminAuth(), async (req, res) => {
  res.render('admin', {products: productsToDisplay})
})

export default viewsRouter;
