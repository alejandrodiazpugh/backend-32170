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

// ADD PRODUCTS
let addProductToListing = document.querySelector('#add-to-stock-btn');
addProductToListing?.addEventListener('click', async (e) => {
	let adminPostForm = document.querySelector('#admin-add-product-form');
	e.preventDefault();
	const formElements = adminPostForm.elements;
	const formData = {};
	for (let input of formElements) {
		if (input.type !== 'button') {
			const key = input.name;
			const value = input.value;
			Object.assign(formData, { [key]: value });
		}
	}
	await postProduct(formData, 'http://localhost:8080/api/productos');
	Swal.fire(swalBehavior);
});

// DELETE PRODUCT
let deleteProductFromListing = document.querySelector('#delete-product-btn');
deleteProductFromListing?.addEventListener('click', async (e) => {
	e.preventDefault();
	const idTodelete = document.querySelector('#select-to-delete').value;
	await deleteProduct(`http://localhost:8080/api/productos/${idTodelete}`);
	Swal.fire;
});

// UPDATE PRODUCT
let updateListing = document.querySelectorAll('.update-btn');
const formData = {};
updateListing?.forEach((btn) => {
	btn?.addEventListener('click', async (e) => {
		const id = e.target.id[0];
		const url = `http://localhost:8080/api/productos/${id}`;
		e.preventDefault();
		const formElements = await document.querySelector(`#update-form-${id}`)
			.elements;
		for (let input of formElements) {
			if (input.type !== 'button') {
				const key = input.name;
				const value = input.value;
				Object.assign(formData, { [key]: value });
			}
		}
		updateProduct(url, formData);

		Swal.fire(swalUpdate);
	});
});

// ADD TO CART
let addToCartBtns = document.querySelectorAll('.card--btn');
addToCartBtns.forEach((btn) => {
	btn?.addEventListener('click', async (e) => {
		e.preventDefault();
		const id = parseInt(e.target.id[0]);
		await postProduct(
			{ id },
			'http://localhost:8080/api/carrito/1/productos'
		);
		Swal.fire(swalBehavior);
	});
});

// DELETE FROM CART
let deleteFromCartBtns = document.querySelectorAll('.delete-from-cart-btn');
deleteFromCartBtns.forEach((btn) => {
	btn?.addEventListener('click', async (e) => {
		e.preventDefault();
		const id = parseInt(e.target.id[0]);
		const url = `http://localhost:8080/api/carrito/1/productos/${id}`;
		await deleteProduct(url);
		const rowToDelete = btn.parentElement;
		rowToDelete.remove();
		Swal.fire(swalDelete);
	});
});

const postProduct = async (body, route) => {
	//TODO: ID dinamico del carrito
	const cart = await fetch(route, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ ...body }),
	});
	return await cart.json();
};

const deleteProduct = async (url) => {
	const cart = await fetch(url, {
		method: 'DELETE',
		headers: {
			accept: 'application/json',
			'Content-type': 'application/json',
		},
	});
	return await cart.json();
};

const updateProduct = async (url, data) => {
	const product = await fetch(url, {
		method: 'PUT',
		headers: {
			accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ ...data }),
	});
	return await product.json();
};
