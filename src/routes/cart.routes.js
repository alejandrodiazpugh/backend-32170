// ----------- IMPORTS ----------
import express from "express";
import { DAO } from "../DAO/index.js";

// ---------- ROUTER ----------
const routerCart = express.Router();

// ---------- DB ACCESS --------
const cart = DAO.carrito;
const products = DAO.productos;

const cartApi = new cart();
const productApi = new products();

// ----- CREATE CART -----
routerCart.post("/", async (req, res) => {
  await cartApi.save(req.body);
  return res.status(201).send({
    code: 201,
    msg: `Carrito creado con éxito`,
  });
});

// ----- DELETE CART -----
routerCart.delete("/:id", async (req, res) => {
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
routerCart.get("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await cartApi.getById(id);
  return res.status(200).json(await cart);
});

// ----- POST PRODUCTS TO CART -----
routerCart.post("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const idToAdd = parseInt(req.body.id);
  const productToAdd = await productApi.getById(idToAdd);
  await cartApi.addToCart(productToAdd, id);
  return res
    .status(201)
    .send({ code: 201, msg: `Se ha actualizado el carrito con id ${id}` });
});

// ----- DELETE PRODUCT FROM CART -----
routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  const cartId = parseInt(req.params.id);
  const productId = parseInt(req.params.id_prod);
  await cartApi.removeFromCart(productId, cartId);
  return res.status(200).send({
    code: 200,
    msg: `Se ha actualizado el carrito con id ${cartId}, eliminando el elemento con id ${productId}`,
  });
});

export default routerCart;
