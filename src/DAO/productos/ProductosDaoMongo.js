//@ts-check
import ContenedorMongo from '../../containers/ContenedorMongo.js';
import { mongoProductModel } from '../../config/dbconfig.js';
import { MONGO_LOGIN } from '../../config/dbconfig.js';

class ProductosDaoMongo extends ContenedorMongo {
	constructor() {
		super(MONGO_LOGIN, mongoProductModel);
	}
}

export default ProductosDaoMongo;
