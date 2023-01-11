import ContenedorMongo from '../Containers/ContenedorMongo.js';
import { mongoModel, MONGO_LOGIN } from '../config/DBSchema.js';

class MensajesDaoMongo extends ContenedorMongo {
	constructor() {
		super(MONGO_LOGIN, mongoModel);
	}
}

export default MensajesDaoMongo;
