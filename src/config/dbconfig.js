import admin from "firebase-admin";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

// ============== FIREBASE CONFIG =================
dotenv.config();

export const initializeFirebase = () => {
  const FIREBASE_ADMIN = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_ADMIN),
  });
};

// ============== MONGODB CONFIG =================

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    titulo: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 1000 },
    url: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    products: [productSchema],
  },
  { timestamps: true }
);

export const mongoProductModel = mongoose.model("productos", productSchema);
export const mongoCartModel = mongoose.model("carrito", cartSchema);
export const MONGO_LOGIN = process.env.MONGO_CREDENTIALS;
