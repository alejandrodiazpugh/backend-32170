import admin  from "firebase-admin";
import { initializeFirebase } from "../config/dbconfig.js";

initializeFirebase()

export class ContenedorFirebase {
  constructor(collectionName) {
    this.db = admin.firestore();
    this.collection = this.db.collection(collectionName);
  }
  
  getTimestamp() {
    let date = new Date();
		return `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()} ${date.toTimeString().split(' ')[0]}`;
  }

  async generateId() {
    const dataPoints = await this.collection.get();
    return dataPoints.size + 1;
  }

  // ===== CRUD =====

  async save(data) {
    try {
      const timestamp = this.getTimestamp();
      const id = await this.generateId();
      const doc = this.collection.doc(`${id}`);
      await doc.create({...data, timestamp});
      return doc.data;
    } catch (err) {
      console.error("Error al guardar en BD: " + err);
    }
  }

  async getAll() {
    try {
      const snapshot = await this.collection.get();
      const docs = snapshot.docs.map((doc) => doc.data());
      return docs;
    } catch (err) {
      console.error(`Error al obtener objetos en la BD: ${err}`);
    }
  }

  async getById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const item = await doc.get();
      return item.data();
    } catch (err) {
      console.error(`Error al obtener objeto en la BD: ${err}`);
    }
  }

  async update(id, data) {
    try{ 
      const doc = this.collection.doc(`${id}`);
      return await doc.update({...data});
    } catch (err) {
      console.error(err)
    }
  }

  async deleteById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      return await doc.delete();
    } catch (err) {
      console.error(err)
    }
  }
}
