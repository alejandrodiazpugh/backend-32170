//Websocket
const socket = io();

socket.on('from-server-messages', async (data) => {
	await renderChat(data);
});

socket.on('from-server-products', (data) => {
	renderProducts(data);
});

const renderChat = async (mensajes) => {
	const cuerpoMensajesHTML = await mensajes
		?.map((mensaje) => {
			return `<span>
				<b class="chatAuthor">${mensaje.author}</b> <small class='date-time'>(${mensaje.dateTime})</small>: <span class="chatText"><i>${mensaje.text}</i></span></span>`;
		})
		.join('<br>');

	document.querySelector('#chatMessages').innerHTML = cuerpoMensajesHTML;
};

const renderProducts = async (products) => {
	const productTable = document.querySelector('#product-table');
	const filaTablaProductos = await products
		?.map((product) => {
			return `
			<div class='product-table-row'>
				<img src=${product.url} alt="" class='product-table-img' />
				<div>${product.titulo}</div> 
				<div>$ ${product.precio}</div>
				<div>${product.stock}</div>
			</div>
				`;
		})
		.join('<br>');
	if (productTable) {
		productTable.innerHTML = filaTablaProductos;
	}
};

const chatBtn = document.querySelector('#add-message-to-chat-btn');
chatBtn?.addEventListener('click', () => {
	const inputEmail = document.querySelector('#inputEmail').value;
	const isValid = ValidateEmail(inputEmail);
	const inputContenido = document.querySelector('#contenidoMensaje').value;
	if (!isValid || inputContenido === '') {
		Swal.fire(swalChat);
		return;
	}

	let date = new Date();
	let stringDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${
		date.toTimeString().split(' ')[0]
	}`;

	const mensaje = {
		author: inputEmail,
		dateTime: stringDate,
		text: inputContenido,
	};

	socket.emit('from-client-message', mensaje);
});

const sendBtn = document.querySelector('#add-to-stock-btn');
sendBtn.addEventListener('click', async () => {
	const titulo = document.querySelector('#titulo').value;
	const descripcion = document.querySelector('#descripcion').value;
	const precio = document.querySelector('#precio').value;
	const url = document.querySelector('#url').value;
	const stock = document.querySelector('#stock').value;

	const product = {
		titulo,
		descripcion,
		precio,
		stock,
		url,
	};

	const notFilled = Object.values(product).some(
		(value) => value === '' || value === null
	);
	if (notFilled) {
		Swal.fire(swalfailedProduct);
		return;
	}

	Swal.fire(swalBehavior);
	socket.emit('from-client-product', product);
});

function ValidateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return true;
	}
	return false;
}

// button behavior
const swalBehavior = {
	titleText: 'Agregado',
	icon: 'success',
	toast: true,
	background: '#f0fcfe',
	position: 'top-start',
	timer: '1500',
	confirmButtonColor: '#0c3756',
	color: '#0c3756',
	iconColor: '#1f5372',
};

const swalDelete = {
	titleText: 'Eliminado',
	icon: 'success',
	toast: true,
	background: '#f0fcfe',
	position: 'top-start',
	timer: '1500',
	confirmButtonColor: '#0c3756',
	color: '#0c3756',
	iconColor: '#1f5372',
};

const swalUpdate = {
	titleText: 'Actualizado',
	icon: 'success',
	toast: true,
	background: '#f0fcfe',
	position: 'top-start',
	timer: '1500',
	confirmButtonColor: '#0c3756',
	color: '#0c3756',
	iconColor: '#1f5372',
};

const swalChat = {
	titleText: 'Error, mensaje o correo no válido.',
	icon: 'error',
	toast: true,
	background: '#f0fcfe',
	position: 'top-start',
	timer: '1500',
	confirmButtonColor: '#0c3756',
	color: '#0c3756',
	iconColor: '#1f5372',
};

const swalfailedProduct = {
	titleText: 'Error, campos faltantes en el producto.',
	icon: 'error',
	toast: true,
	background: '#f0fcfe',
	position: 'top-start',
	timer: '1500',
	confirmButtonColor: '#0c3756',
	color: '#0c3756',
	iconColor: '#1f5372',
};
