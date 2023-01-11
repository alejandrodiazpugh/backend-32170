//Websocket
const socket = io();
const schema = window.normalizr.schema;
const normalize = window.normalizr.normalize;
// NORMALIZR SCHEMA 
const emailSchema = new schema.Entity('email');
const nombreSchema = new schema.Entity('nombre');
const apellidoSchema = new schema.Entity('apellido');
const edadSchema = new schema.Entity('edad');
const aliasSchema = new schema.Entity('alias');
const avatarSchema = new schema.Entity('email');

const authorSchema = new schema.Entity(
	'author',
	{
		email: emailSchema,
		nombre: nombreSchema,
		apellido: apellidoSchema,
		edad: edadSchema,
		alias: aliasSchema,
		avatar: avatarSchema,
	},
	{ idAttribute: 'email' }
);

const textSchema = new schema.Entity('text');

const normalizeMessageSchema = new schema.Entity(
	'message',
	{
		id: 'mensajes',
		author: authorSchema,
		text: [textSchema],
	},
);


const renderChat = async (mensajes) => {
	const cuerpoMensajesHTML = await mensajes
		?.map((mensaje) => {
			return `<span>
		<b class="chatAuthor">${mensaje.author.alias}</b> <small class='date-time'>(${mensaje.date})</small>: <span class="chatText"><i>${mensaje.text}</i></span></span>`;
		})
		.join('<br>');

	document.querySelector('#chatMessages').innerHTML = cuerpoMensajesHTML;
};

// const renderProducts = async (products) => {
// 	const productTable = document.querySelector('#product-table');
// 	const filaTablaProductos = await products
// 		?.map((product) => {
// 			return `
// 			<div class='product-table-row'>
// 			<img src=${product.url} alt="" class='product-table-img' />
// 			<div>${product.titulo}</div> 
// 			<div>$ ${product.precio}</div>
// 			<div>${product.stock}</div>
// 			</div>
// 			`;
// 		})
// 		.join('<br>');
// 	if (productTable) {
// 		productTable.innerHTML = filaTablaProductos;
// 	}
// };

const chatBtn = document.querySelector('#add-message-to-chat-btn');
chatBtn?.addEventListener('click', () => {
	const inputEmail = document.querySelector('#inputEmail').value;
	const firstName = document.querySelector('#firstName').value;
	const lastName = document.querySelector('#lastName').value;
	const age = document.querySelector('#age').value;
	const alias = document.querySelector('#username').value;
	const avatar = document.querySelector('#avatar').value;
	const isValid = ValidateEmail(inputEmail);
	const inputContenido = document.querySelector('#contenidoMensaje').value;
	if (!isValid || inputContenido === '') {
		Swal.fire(swalChat);
		return;
	}

	let date = new Date();
	let stringDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()} ${date.toTimeString().split(' ')[0]}`;

	const mensaje = {
		author: {
			email: inputEmail,
			nombre: firstName,
			apellido: lastName,
			edad: age,
			alias: alias,
			avatar: avatar,
		},
		date: stringDate,
		text: inputContenido,
	};
	const normalizedMensaje = normalize(mensaje, normalizeMessageSchema)

	socket.emit('from-client-message', normalizedMensaje);
});

socket.on('from-server-messages', async (data) => {
	await renderChat(data);
});

// socket.on('from-server-products', (data) => {
// 	renderProducts(data);
// });
// const sendBtn = document.querySelector('#add-to-stock-btn');
// sendBtn.addEventListener('click', async () => {
// 	const titulo = document.querySelector('#titulo').value;
// 	const descripcion = document.querySelector('#descripcion').value;
// 	const precio = document.querySelector('#precio').value;
// 	const url = document.querySelector('#url').value;
// 	const stock = document.querySelector('#stock').value;

// 	const product = {
// 		titulo,
// 		descripcion,
// 		precio,
// 		stock,
// 		url,
// 	};

// 	const notFilled = Object.values(product).some(
// 		(value) => value === '' || value === null
// 	);
// 	if (notFilled) {
// 		Swal.fire(swalfailedProduct);
// 		return;
// 	}

// 	Swal.fire(swalBehavior);
// 	socket.emit('from-client-product', product);
// });

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

// FAKER PRODUCTS API

const getFakeProducts = async (url) => {
	try {
		const products = await fetch(url);
		const data = await products.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};

const generateTable = async (url) => {
	try {
		const data = await getFakeProducts(url);
		const table = document.getElementById('fake-products');
		await data?.forEach((product) => {
			let row = document.createElement('div');
			row.classList.add('product-table-row');
			row.innerHTML = `
			<div class='filler'></div>
			<div>${product.productName}</div> 
			<div>$ ${product.price}</div>
			<img src=${product.img} alt="" class='product-table-img' />
			`;
			table.append(row);
		});
	} catch (err) {
		console.error(err);
	}
};
const TEST_URL = 'http://localhost:8080/api/productos-test';

generateTable(TEST_URL);
