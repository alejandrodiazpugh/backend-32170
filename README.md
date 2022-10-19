# backend-32170

Repositorio general para el curso backend de Coderhouse

## Desafio 1 - Clases

**Consigna**

-   Crear una clase Usuario con un constructor
-   Crear 5 métodos para la clase Usuario
-   Probar los métodos inicializando un objeto

**Ejecución**

En sí, el desafío no es muy complicado, pero sirve para familiarizarse con la sintaxis de clases en JS. Aproveché que este es un desafío breve para aplicar TypeScript y jugar con tipos e interfaces.

## Desafio 2 - Manejo de Archivos

**Consigna**

-   Implementar un programa que contenga una clase Contenedor que reciba el nombre del archivo que se va a trabajar e implemente 5 metodos:
    -   save(object)
    -   getById(id)
    -   getAll()
    -   deleteById(id)
    -   deleteAll()

**Ejecución**

Terminé relativamente rápido de hacer la clase y los métodos, pero me tardé mucho tiempo intentando debuggear un bucle infinito en todos los métodos que implementaban el fs.promises.writeFile. Después de 2 días, descubrí que el culpable no era el código en sí, sino que nodemon interactúa de forma extraña con la función main.