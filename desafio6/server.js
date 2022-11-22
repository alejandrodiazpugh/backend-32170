//@ts-check

// --------------------------- IMPORTS ---------------------------

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const handlebars = require('express-handlebars');
const routerForm = require('./src/routes/form.routes');
const products = require('./src/data/products.json');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// --------------------------- BASE DE DATOS ----------------------
const DB_MESSAGES = [];
const DB_PRODUCTS = products;

// --------------------------- MOTOR DE PLANTILLAS ---------------------------
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.engine(
	'hbs',
	handlebars.engine({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: 'hbs',
	})
);

// --------------------------- RUTAS ---------------------------

app.use('/', routerForm);

app.get('*', (req, res) => {
	res.status(404).send('Error 404: La página solicitada no existe.');
});

// --------------------------- SERVIDOR ---------------------------
const PORT = 8081;

const server = httpServer.listen(PORT, () => {
	console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

server.on('error', (error) => {
	console.log(`Error: ${error}`);
});

// --------------------------- WEBSOCKET ---------------------------
io.on('connection', (socket) => {
	socket.emit('from-server-messages', DB_MESSAGES);
	socket.emit('from-server-products', DB_PRODUCTS);

	socket.on('from-client-message', (message) => {
		DB_MESSAGES.push(message);
		io.sockets.emit('from-server-messages', DB_MESSAGES);
	});

	socket.on('from-client-product', (product) => {
		let id = DB_PRODUCTS.length + 1;
		const fullProduct = { ...product, id };
		DB_PRODUCTS.push(fullProduct);
		fs.promises.writeFile(
			'./src/data/products.json',
			JSON.stringify(DB_PRODUCTS)
		);
		io.sockets.emit('from-server-products', DB_PRODUCTS);
	});
});
