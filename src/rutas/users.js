import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladoresDB/userController.js";

const users = express.Router();

users.get('/', (req, res) => {
    res.send('Hola Sitio usuario');
});

users.post('/crear', (req, res) => {
    //res.send('Crear usuario');
    crear(req,res);
    
});

users.get('/buscar', (req, res) => {
    //res.send('Buscar usuario');
    buscar(req,res);
});

users.get('/buscarId/:id', (req, res) => {
    //res.send('Buscar usuario');
    buscarId(req,res);
});

users.put('/actualizar/:id', (req, res) => {
    //res.send('Actualizar usuario');
    actualizar(req,res);
});

users.delete('/eliminar/:id', (req, res) => {
    //res.send('eliminar usuario');
    eliminar(req,res);
});

export {users}