import { faker } from '@faker-js/faker/locale/es_MX';

const generateProducts = (amount) => {
	const productos = [];
	let id = 1;
	for (let i = 0; i < amount; i++) {
		const producto = {
			productName: faker.commerce.productName(),
			price: faker.commerce.price(299, 999, 2),
			img: faker.image.food(500, 500),
		};
		Object.assign(producto, id);
		productos.push(producto);
		id++;
	}
	return productos;
};

export default generateProducts;
