//@ts-check
// --------------------------- IMPORTS ---------------------------

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import viewsRouter from './src/routes/view.routes.js';
import productRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/cart.routes.js';
import ContenedorSQL from './src/utils/ContenedorSQL.js';
import { mysqlConnection } from './config/mysqlConnection.js';
import { sqliteConnection } from './config/sqliteConnection.js';

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productContainer = new ContenedorSQL(mysqlConnection, 'productos');

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// --------------------------- MOTOR DE PLANTILLAS ---------------------------
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// --------------------------- RUTAS ---------------------------

app.use('/', viewsRouter);
app.use('/api/productos', productRouter);
// app.use('/api/carrito', cartRouter);

// app.post('/product', async (req, res) => {
// 	console.log(req.body);
// 	productContenedor.save(req.body);

// 	io.sockets.emit('products', await productContenedor.getAll());
// 	res.redirect('/');
// });

app.get('*', (req, res) => {
	res.status(404).send('Error 404: La página solicitada no existe.');
});

// --------------------------- SERVIDOR ---------------------------
const server = httpServer.listen(PORT || 8080, () => {
	console.log(`Servidor iniciado en ${PORT || 'http://localhost:8080'}`);
});

server.on('error', (error) => {
	console.log(`Error al levantar servidor: ${error}`);
});

// --------------------------- WEBSOCKET ---------------------------

io.on('connection', async (socket) => {
	console.log('socket id: ', socket.id);

	socket.emit('from-server-products', await productContainer.getAll());
});
