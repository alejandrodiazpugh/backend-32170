import { ContenedorFirebase } from "../../containers/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('products');
    }
}

export default ProductosDaoFirebase;