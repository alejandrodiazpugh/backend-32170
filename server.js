//@ts-check
// --------------------------- IMPORTS ---------------------------

import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import viewsRouter from './src/routes/view.routes.js';
import ContenedorSQL from './src/utils/ContenedorSQL.js';
import { mysqlConnection } from './config/mysqlConnection.js';
import { sqliteConnection } from './config/sqliteConnection.js';
import routerProductsTest from './src/routes/products-test.routes.js';

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// --------------------------- BASE DE DATOS ----------------------
const messageContainer = new ContenedorSQL(sqliteConnection, 'mensajes');
const productContainer = new ContenedorSQL(mysqlConnection, 'productos');

// --------------------------- RUTAS ---------------------------

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', viewsRouter);
app.use('/api/productos-test', routerProductsTest);

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
	socket.emit('from-server-messages', await messageContainer.getAll());
	socket.emit('from-server-products', await productContainer.getAll());

	socket.on('from-client-message', async (message) => {
		await messageContainer.save(message);
		io.sockets.emit(
			'from-server-messages',
			await messageContainer.getAll()
		);
	});

	socket.on('from-client-product', async (product) => {
		productContainer.save(product);
		io.sockets.emit(
			'from-server-products',
			await productContainer.getAll()
		);
	});
});
