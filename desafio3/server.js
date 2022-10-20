//@ts-check

// --------------------------- IMPORTS --------------------------- 

const express = require('express');
const { Contenedor } = require('./Contenedor');

// --------------------------- INSTANCIA Y VARIABLES --------------------------- 

const app = express();

const productos = new Contenedor('./productos.txt');
const PORT = 8080;
const randomBetween = (num) => { return Math.floor(Math.random() * num) + 1 }

// --------------------------- RUTAS --------------------------- 

app.get('/productos', async (req, res) => {
    res.send(await productos.getAll())
})

app.get('/productoRandom', async (req, res) => {
    res.send(await productos.getById(randomBetween((await productos.getAll()).length)))
})

// --------------------------- SERVIDOR --------------------------- 
const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})