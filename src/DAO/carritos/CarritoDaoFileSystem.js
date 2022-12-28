import ContenedorFS from "../../containers/ContenedorFS.js";
import fs from 'fs'

const FS_PATH = './src/data/cart.json';

class CarritoDaoFileSystem extends ContenedorFS {
    constructor() {
        super(FS_PATH)
    }

    async addToCart(data, cartId) {
            try {
                const carts = await this.getAll();
                const cartToFind = carts.find(
                    (cart) => cart.id === cartId
                );
                if (cartToFind === undefined) {
                    // Si no existe el carrito lo crea
                    await this.save({ products: [] });
                    const id = cartId;
                    const itemToSend = data;
                    return await this.addToCart(id, itemToSend); // recursion
                }
                cartToFind.products.push(data);
                carts.splice(carts.indexOf(cartToFind), 1, cartToFind);
                fs.promises.writeFile(this.path, JSON.stringify(carts));
                return cartToFind;
            } catch (error) {
                console.log('Error al agregar elemento: ' + error);
            }
        }
    async removeFromCart(query, cartId) {
        try {
            const carts = await this.getAll();
            const cart = await this.getById(cartId);
            const indexOfCart = carts.indexOf(cart);
            const productToRemove = cart.products.find((product) => parseInt(product.id) === query)
            const indexToRemove = cart.products.indexOf(productToRemove);
            cart.products.splice(indexToRemove, 1);
            carts.splice(indexOfCart,1);
            fs.promises.writeFile(this.path, JSON.stringify(carts));
        } catch (err) {
            console.log(err)
        }

    }
}

export default CarritoDaoFileSystem