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
}

let addToCartBtns = document.querySelectorAll('.card--btn');
addToCartBtns.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault();
		const id = parseInt(e.target.id[0]);
		await postProduct(id);
		Swal.fire(swalBehavior);
	});
});

let deleteFromCartBtns = document.querySelectorAll('.delete-from-cart-btn');
deleteFromCartBtns.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault();
		const id = parseInt(e.target.id[0]);
		await deleteProduct(id);
		const rowToDelete = btn.parentElement;
		rowToDelete.remove()
		Swal.fire(swalDelete)
	})
})

const postProduct = async (id) => {
	//TODO: ID dinamico del carrito
	const cart = await fetch('http://localhost:8080/api/carrito/1/productos', {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({ id: parseInt(id) }),
	});
	return await cart.json()
};

const deleteProduct = async (id) => {
	const cart = await fetch(`http://localhost:8080/api/carrito/1/productos/${id}`, {
		method: 'DELETE',
		headers: {
			'accept': 'application/json',
			'Content-type': 'application/json'
		}
	});
	return await cart.json()
}
