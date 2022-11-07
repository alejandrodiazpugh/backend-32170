# backend-32170

Repositorio general para el curso backend de Coderhouse

## Desafio 1 - Clases

**Consigna**

-   Crear una clase Usuario con un constructor
-   Crear 5 métodos para la clase Usuario
-   Probar los métodos inicializando un objeto

**Ejecución**

En sí, el desafío no es muy complicado, pero sirve para familiarizarse con la sintaxis de clases en JS. Aproveché que este es un desafío breve para aplicar TypeScript y jugar con tipos e interfaces.

EDIT: Se me solicitó quitar el TS del proyecto, y solo usar JavaScript, por lo que tuve que eliminar las interfaces y tipados

## Desafio 2 - Manejo de Archivos

**Consigna**

-   Crear una clase Contenedor con 5 métodos
    -   getAll()
    -   getById(id)
    -   save(product)
    -   deleteById(id)
    -   deleteAll()

**Ejecución**

Tardé dos días en este desafío, no por el código en sí, sino porque nodemon me creaba bucles infinitos en los métodos save y deleteByID. Nunca entendí por que pasó, pero si se hace con node no hay problema. 

## Desafio 3 - Servidor con Express

**Consigna**

-   Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
    -   Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
    -   Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
    -   Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los
      datos persistidos del servidor.


**Ejecución**

Siguiendo lo que se vio en el curso no es tan complicado entender como levantar el servidor. No termino de entender cómo se levanta el servidor si nunca llamo la variable "server".


## Desafio 4 - API RESTful

**Consigna**

-   Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.
    -   GET '/api/productos' -> devuelve todos los productos.
    -   GET '/api/productos/:id' -> devuelve un producto según su id.
    -   POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
    -   PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
    -   DELETE '/api/productos/:id' -> elimina un producto según su id.


**Ejecución**

En este desafío el reto fue intentar separar las capas de lo que se hace en la ruta y lo que se hace en el contenedor de productos. Tuve problemas para que los mensajes de error se mostraran (por ejemplo, si tengo 5 productos y hago un PUT request para modificar el 9o elemento), pero eventualmente pude hacerlo.
En mi rama local tengo una versión con TS, para poder dar seguridad al POST y PUT request, pero al final preferí simplificarme la vida y dejarlo en JS.
