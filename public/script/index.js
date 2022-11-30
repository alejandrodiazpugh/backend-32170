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

let addToCartBtns = document.querySelectorAll('.card--btn');
addToCartBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		const id = parseInt(e.target.id[0]);
		// const product = getProduct(`http://localhost:8080/api/productos/${id}`);
		postProduct(id);
		console.log(id);
		Swal.fire(swalBehavior);
	});
});

const getProduct = async (apiUrl) => {
	let res = await fetch(apiUrl);
	let data = await res.json();
	return data;
};

const postProduct = async (id) => {
	const cart = await fetch('http://localhost:8080/api/carrito/1/productos', {
		method: 'POST',
		body: JSON.stringify({ id: id }),
	});
	console.log(cart.body);
};
