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
