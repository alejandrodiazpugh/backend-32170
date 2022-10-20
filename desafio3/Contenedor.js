//@ts-check
const fs = require("fs");

class Contenedor {
  constructor(path) {
    this.path = path;
  }
  async getAll() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log("Error al obtener productos: " + error);
    }
  }
  async getById(queryId) {
    try {
      const products = await this.getAll();
      const productToGet = products.filter((product) => product.id === queryId);
      if (productToGet.length === 0) {
        return `No existe un producto con ID ${queryId} en el listado`;
      }
      return productToGet;
    } catch (error) {
      console.log("Error al obtener producto: " + error);
    }
  }
  async save(product) {
    try {
      const products = await this.getAll();
      let id = products.length + 1;
      const newProduct = { ...product, id };
      products.push(newProduct);
      fs.promises.writeFile(this.path, JSON.stringify(products));
      return `Se ha guardado el producto '${product.title}' con el id: ${id}.`;
    } catch (error) {
      console.log("Error al guardar producto: " + error);
    }
  }

  async deleteById(queryId) {
    try {
      const products = await this.getAll();
      const productToDelete = products.filter((product) => product.id === queryId)[0];
      const index = products.indexOf(productToDelete);
      if (index === -1) {
        return `No existe un producto con ID ${queryId} en el listado`;
      }
      products.splice(index, 1);
      fs.promises.writeFile(this.path, JSON.stringify(products));
      return `Se ha eliminado el producto '${productToDelete.title}' con ID ${queryId} del listado.`;
    } catch (error) {
      console.log("Error al borrar producto: " + error);
    }
  }
  async deleteAll() {
    try{
      fs.promises.writeFile(this.path,'[]')
      return 'Se ha borrado el listado.'
    } catch(error) {
      console.log('Error al borrar productos: ' + error)
    }
  }
}

exports.Contenedor = Contenedor;