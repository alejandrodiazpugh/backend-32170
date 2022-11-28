
// --------------------------- IMPORTS ---------------------------

import express from 'express'
import path from 'path'
import productRouter from './src/routes/products.routes';

// --------------------------- INSTANCIA Y VARIABLES ---------------------------

const app = express();
const PORT = process.env.PORT;

// --------------------------- MIDDLEWARE ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
	console.log(`Servidor iniciado en ${PORT || 'http://localhost:3000' }`);
});

server.on('error', (error) => {
	console.log(`Error: ${error}`);
});
