import mongoose from 'mongoose';

export default class ContenedorMongo {
	constructor(url, model) {
		this.model = model;
		this.url = url;
		this.connection = null;
	}

	async generateId() {
		const dataPoints = parseInt(await this.model.count({}));
		return dataPoints + 1;
	}

	async connect() {
		try {
			this.connection = mongoose.connect(this.url, {
				useNewURLParser: true,
				useUnifiedTopology: true,
				serverSelectionTimeoutMS: 5000,
			});
			console.log('Conexion establecida a MongoDB');
		} catch (err) {
			throw new Error(`Error conectando a MongoDB: ${err}`);
		}
	}

	// ===== CRUD =====
	async getAll() {
		try {
			this.connect();
			const queryResult = await this.model.find({});
			console.log(queryResult);
			return await queryResult;
		} catch (err) {
			console.error(`Error al obtener objetos en la BD: ${err}`);
		}
	}

	async getById(query) {
		try {
			this.connect();
			const queryResult = await this.model.findOne({ id: query });
			console.log(queryResult);
			return queryResult;
		} catch (err) {
			console.error(`Error al obtener objeto en la BD: ${err}`);
		}
	}

	async save(data) {
		try {
			this.connect();
			const id = await this.generateId();
			const parsedData = { ...data, id };
			const saveData = await this.model.create(parsedData);
			console.log(saveData);
			return await saveData;
		} catch (err) {
			console.error(`Error al guardar objeto en la BD: ${err}`);
		}
	}

	async update(query, data) {
		try {
			this.connect();
			const updatedData = await this.model.findOneAndUpdate(
				{ id: query },
				{ $set: { ...data } },
				{ upsert: true }
			);
			console.log(updatedData);
			return updatedData;
		} catch (err) {
			console.error(`Error al actualizar la base de datos: ${err}`);
		}
	}

	async deleteById(query) {
		try {
			this.connect();
			const deleteData = await this.model.deleteOne({ id: query });
			console.log(deleteData);
			return await deleteData;
		} catch (err) {
			console.error(`Error al eliminar elemento: ${err}`);
		}
	}
}
