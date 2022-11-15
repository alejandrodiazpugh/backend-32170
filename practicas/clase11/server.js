const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado!');

	socket.emit('message', 'Este es el mensaje desde el servidor');
	socket.on('notification', (data) => {
		console.log(data);
	});
});

const PORT = 8081;
const server = httpServer.listen(PORT, () => {
	console.log(`Servid escuchando en http://localhost:${PORT}`);
});

server.on('error', () => {
	console.log(`Error en la conexión`);
});
