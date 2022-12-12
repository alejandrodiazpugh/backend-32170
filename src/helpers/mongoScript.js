// PASO 1: Crear Documento
use ecommerce;

// PASO 2: Crear colecciones:
db.createCollection('productos');
db.createCollection('mensajes');

// PASO 3: Agregar productos y mensajes
db.productos.insertMany([
	{
		titulo: 'Mistborn: El Imperio Final',
		descripcion:
			'Durante mil años han caído las cenizas y nada florece. Durante mil años los skaa han sido esclavizados y viven sumidos en un miedo inevitable. Durante mil años el Lord Legislador reina con un poder absoluto gracias al terror, a sus poderes e inmortalidad',
		url: 'https://m.media-amazon.com/images/I/51144EP2vZL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
		precio: 399,
		stock: 20,
		codigo: 'MI-1-3445',
		timestamp: '28/11/2022 16:04:02',
		id: 1,
	},
	{
		titulo: 'La Ladrona de Libros',
		descripcion:
			'En plena II Guerra Mundial, la pequeña Liesel hallará su salvación en la lectura. Una novela preciosa, tremendamente humana y emocionante, que describe las peripecias de una niña alemana de nueve años desde que es dada en adopción por su madre hasta el final de la guerra. Su nueva familia, gente sencilla y nada afecta al nazismo, le enseña a leer y a través de los libros Rudy logra distraerse durante los bombardeos y combatir la tristeza. Pero es el libro que ella misma está escribiendo el que finalmente le salvará la vida.',
		url: 'https://m.media-amazon.com/images/I/516yyKFsThL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
		precio: 549,
		stock: 20,
		codigo: 'LA-2-3123',
		timestamp: '28/11/2022 16:04:59',
		id: 2,
	},
	{
		url: 'https://m.media-amazon.com/images/I/41Fl3HLmZvL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
		titulo: 'Tokio Blues',
		descripcion:
			'Una historia de amor triangular que se convierte en el relato de una educación sentimental pero también de las pérdidas que implica toda maduración. Toru Watanabe, un ejecutivo de 37 años, escucha casualmente mientras aterriza en un aeropuerto europeo una vieja canción de los Beatles, y la música le hace retroceder a su juventud, al turbulento Tokio de finales de los sesenta.',
		precio: '399',
		stock: '20',
		codigo: ' WOQTG-3-3238',
		timestamp: '2/12/2022 00:03:02',
		id: 3,
	},
	{
		titulo: 'American Gods',
		descripcion:
			'Dioses antiguos, héroes mitológicos y figuras legendarias se dan cita en la obra narrativa más importante del extraordinario Neil Gaiman. Días antes de salir de prisión, la mujer de Sombra, Laura, muere en un misterioso accidente de coche. Aturdido por el dolor, emprende el regreso a casa. En el avión, se encontrará con el enigmático señor Miércoles, que dice ser un refugiado de una guerra antigua, un dios y también el rey de América. Juntos se embarcan en un viaje extraño a través de los Estados Unidos, mientras una tormenta de dimensiones épicas amenaza con desencadenarse.',
		url: 'https://www.elsotano.com/imagenes/9788415/978841572920.JPG',
		precio: 599,
		stock: 20,
		codigo: 'AM-4-2351',
		timestamp: '28/11/2022 16:08:28',
		id: 4,
	},
	{
		titulo: 'The Poppy War',
		descripcion:
			'La Segunda Guerra de las Amapolas ha dejado Nikan desolada. Rin, huérfana de guerra, vive con los Fang que la fuerzan a trabajar en el negocio familiar. Su único posible futuro es un matrimonio concertado con algún vejestorio. Pero Rin no piensa aceptarlo.',
		url: 'https://m.media-amazon.com/images/I/81LaymbiSlL.jpg',
		precio: 599,
		stock: 20,
		codigo: 'TH-6-6676',
		timestamp: '28/11/2022 16:02:53',
		id: 5,
	},
	{
		titulo: 'El Principito',
		descripcion:
			'El principito es una narración corta del escritor francés Antoine de Saint-Exupéry, que trata de la historia de un pequeño príncipe que parte de su asteroide a una travesía por el universo, en la cual descubre la extraña forma en que los adultos ven la vida y comprende el valor del amor y la amistad',
		url: 'https://m.media-amazon.com/images/I/811kjwhnjcS.jpg',
		precio: '199',
		stock: '20',
		codigo: ' HXXJK-7-6494',
		timestamp: '1/12/2022 11:56:18',
		id: 6,
	},
	{
		titulo: 'El Gran Gatsby',
		descripcion:
			'Relata la historia de Jay Gatsby y su deseo de recuperar a su gran amor, así como el lado oscuro de la vida de los nuevos ricos y la clase aristocrática de Estados Unidos a principios del siglo XX, específicamente en la Nueva York de los años veinte.',
		url: 'https://m.media-amazon.com/images/I/41RuMQweBuL.jpg',
		precio: '299',
		stock: '20',
		codigo: ' SRHTK-4-4682',
		timestamp: '1/12/2022 16:40:17',
		id: 7,
	},
	{
		titulo: 'Matar a un Ruiseñor',
		descripcion:
			'Atticus Finch sorprenderá a la sociedad haciéndose cargo de un caso que parece perdido debido a los prejuicios raciales existentes. La decisión de Finch de defender al hombre acusado provocará una lista de conflictos con gente de la profesión, pero en cambio le otorgará la admiración de sus dos hijos.',
		url: 'https://m.media-amazon.com/images/I/81+j6JIEweL.jpg',
		precio: '579',
		stock: '20',
		codigo: ' MRIPW-9-2256',
		timestamp: '7/12/2022 14:23:33',
		id: 8,
	},
	{
		titulo: 'Outliers: Fuera de Serie',
		descripcion:
			'Outliers o en español Fuera de Serie Por Qué Unas Personas Tienen Éxito y otras No nos explica porqué no existe nadie que logre algo solo, y como el secreto detrás del éxito de algunos de los mejores viene de esfuerzo, suerte y otros factores que muchas veces no podemos controlar.',
		url: 'https://m.media-amazon.com/images/I/71PP92fxyEL.jpg',
		precio: '399',
		stock: '20',
		codigo: ' PRMVVT-9-9567',
		timestamp: '1/12/2022 16:40:17',
		id: 9,
	},
	{
		titulo: 'Orgullo y Prejuicio',
		descripcion:
			'la novela más popular de Jane Austen, Orgullo y prejuicio, es el reverso del amor a primera vista. Fitzwilliam Darcy ve a Elizabeth Bennet en un baile y, al principio, solo está moderadamente impresionado, mientras que ella no lo soporta en absoluto. Solo después de innumerables malentendidos y el triunfo sobre el orgullo y los prejuicios, ambos se encuentran.',
		url: 'https://m.media-amazon.com/images/I/71wnBzT9WqL.jpg',
		precio: '799',
		stock: '20',
		codigo: ' JAORP-1-3554',
		timestamp: '7/12/2022 17:15:44',
		id: 10,
	},
]);

db.mensajes.insertMany([
    
]);
