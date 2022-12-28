import ContenedorFS from '../../containers/ContenedorFS.js'

const FS_PATH = './src/data/products.json';


class ProductosDaoFileSystem extends ContenedorFS {
    constructor() {
        super(FS_PATH)
    }
}

export default ProductosDaoFileSystem