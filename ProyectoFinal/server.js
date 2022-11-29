//@ts-check
// --------------------------- IMPORTS ---------------------------

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './src/routes/view.routes.js';
import productRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/cart.routes.js';

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// --------------------------- MOTOR DE PLANTILLAS ---------------------------
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// --------------------------- RUTAS ---------------------------

app.get('/', viewsRouter);
app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

app.get('*', (req, res) => {
	res.status(404).send('Error 404: La página solicitada no existe.');
});

// --------------------------- SERVIDOR ---------------------------
const server = app.listen(PORT || 8080, () => {
	console.log(`Servidor iniciado en ${PORT || 'http://localhost:8080'}`);
});

server.on('error', (error) => {
	console.log(`Error: ${error}`);
});
