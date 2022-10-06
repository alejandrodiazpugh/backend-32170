interface usuario {
	nombre: string;
	apellido: string;
	libros: libro[];
	mascotas: string[];
}

interface libro {
	titulo: string;
	autor: string;
}

class Usuario implements usuario {
	nombre: string;
	apellido: string;
	libros: libro[];
	mascotas: string[];

	constructor(
		nombre: string,
		apellido: string,
		libros: libro[],
		mascotas: string[]
	) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}

	getFullName(): string {
		return `${this.nombre} ${this.apellido}`;
	}

	addMascota(mascota: string): void {
		this.mascotas.push(mascota);
	}

	countMascotas(): number {
		return this.mascotas.length;
	}

	addBook(titulo: string, autor: string): void {
		this.libros.push({ titulo, autor });
	}

	getBookNames(): string[] {
		const bookNameArr: string[] = [];
		this.libros.forEach((libro: libro) => {
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
