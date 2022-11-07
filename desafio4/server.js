//@ts-check

// --------------------------- IMPORTS ---------------------------

const express = require('express');
const morgan = require('morgan');
const routerProducts = require('./src/routes/products.routes');

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();

const PORT = 8080;

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// --------------------------- RUTAS ---------------------------

app.use('/api/productos', routerProducts);

app.get('*', (req, res) => {
	res.status(404).send('Error 404: La página solicitada no existe.');
});

// --------------------------- SERVIDOR ---------------------------
const server = app.listen(PORT, () => {
	console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

server.on('error', (error) => {
	console.log(`Error: ${error}`);
});
