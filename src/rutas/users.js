import express from "express";
import { crear, buscar, buscarId, buscarIdPorEmail, actualizar, eliminar, buscarPorEmail } from "../controladoresDB/userController.js";

const users = express.Router();

users.get('/', (req, res) => {
    res.send('Hola Sitio usuario');
});

users.post('/crear', (req, res) => {
    crear(req, res);
});

users.get('/buscar', (req, res) => {
    buscar(req, res);
});

// Nueva ruta para buscar por nombre y correo
users.get('/buscarPorEmail/:email/:password', (req, res) => {
    buscarPorEmail(req, res);
});


users.get('/buscarId/:id', (req, res) => {
    buscarId(req, res);
});

users.get('/buscarIdPorEmail/:email', (req, res) => {
    buscarIdPorEmail(req, res);
});

users.put('/actualizar/:id', (req, res) => {
    actualizar(req, res);
});

users.delete('/eliminar/:id', (req, res) => {
    eliminar(req, res);
});

export { users };
