//@ts-check

// --------------------------- IMPORTS ---------------------------

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routerForm = require('./src/routes/form.routes');

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();
const PORT = 8080;

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// --------------------------- MOTOR DE PLANTILLAS ---------------------------
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// --------------------------- RUTAS ---------------------------

app.use('/', routerForm);

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
