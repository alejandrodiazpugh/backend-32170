import ProductosDaoMongo from "./productos/ProductosDaoMongo.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import ProductosDaoFileSystem from "./productos/ProductosDaoFileSystem.js";
import CarritoDaoFirebase from "./carritos/CarritoDaoFirebase.js";
import CarritoDaoMongo from "./carritos/CarritoDaoMongo.js";
import CarritoDaoFileSystem from "./carritos/CarritoDaoFileSystem.js";

const MONGO = {
    productos: ProductosDaoMongo,
    carrito: CarritoDaoMongo
}

const FIREBASE = {
    productos: ProductosDaoFirebase,
    carrito: CarritoDaoFirebase
}

const FILESYSTEM = {
    productos: ProductosDaoFileSystem,
    carrito: CarritoDaoFileSystem
}

export const DAO = FIREBASE;