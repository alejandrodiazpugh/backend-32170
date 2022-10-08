
class Usuario  {
	nombre;
	apellido;
	libros;
	mascotas;

	constructor(
		nombre,
		apellido,
		libros,
		mascotas
	) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}

	getFullName() {
		return `${this.nombre} ${this.apellido}`;
	}

	addMascota(mascota) {
		this.mascotas.push(mascota);
	}

	countMascotas() {
		return this.mascotas.length;
	}

	addBook(titulo, autor) {
		this.libros.push({ titulo, autor });
	}

	getBookNames() {
		const bookNameArr = [];
		this.libros.forEach((libro) => {
			bookNameArr.push(libro.titulo);
		});
		return bookNameArr;
	}
}

// PRUEBA

let usuario = new Usuario(
	'Alejandro',
	'Díaz',
	[{ titulo: 'Mistborn', autor: 'Brandon Sanderson' }],
	['Musi', 'Tiki', 'Sally']
);

console.log({
	'Nombre Completo:': usuario.getFullName(),
	'No. de mascotas': usuario.countMascotas(),
	'Titulos de libros:': usuario.getBookNames(),
});

usuario.addMascota('Chuck');
usuario.addBook('1Q84', 'Haruki Murakami');

console.log({
	'Nombre Completo:': usuario.getFullName(),
	'No. de mascotas': usuario.countMascotas(),
	'Titulos de libros:': usuario.getBookNames(),
});
