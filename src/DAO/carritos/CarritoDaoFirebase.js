import { ContenedorFirebase } from "../../containers/ContenedorFirebase.js";

class CarritoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carrito");
  }
  async addToCart(data, cartId) {
    try {
      const cart = await this.getById(`${cartId}`);
      const products = await cart.products;
      products.push(data);
      return await this.collection
        .doc(`${cartId}`)
        .update({ products: products });
    } catch (err) {
      console.error(err);
    }
  }

  async removeFromCart(query, cartId) {
    try {
      const cart = await this.getById(`${cartId}`);
      const products = await cart.products;
      const productToRemove = products.find(
        (product) => parseInt(product.id) === query
    );
    const indexToRemove = cart.products.indexOf(productToRemove);
    cart.products.splice(indexToRemove, 1);
      return await this.collection
        .doc(`${cartId}`)
        .update({ products: products });
    } catch (err) {
      console.error(err);
    }
  }
}

export default CarritoDaoFirebase;
