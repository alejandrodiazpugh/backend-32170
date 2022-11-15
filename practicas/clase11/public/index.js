const socket = io.connect();

socket.on('message', (data) => {
	console.log(data);
	socket.emit('notification', 'Mensaje recibido');
});

socket.on('messages', (data) => {
	console.log(data);
});

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
});
