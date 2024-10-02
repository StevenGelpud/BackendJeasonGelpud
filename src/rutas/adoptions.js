import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladoresDB/adoptionController.js";


const adoptions = express.Router();


adoptions.get('/', (req, res) => {
    res.send('Hola Sitio de adopcion');
});

adoptions.post('/crear', (req, res) => {
    //res.send('Crear adopcion');
    crear(req,res);
    
});

adoptions.get('/buscar', (req, res) => {
    //res.send('Buscar adopcion');
    buscar(req,res);
});

adoptions.get('/buscarId/:id', (req, res) => {
    //res.send('Buscar adopcion');
    buscarId(req,res);
});

adoptions.put('/actualizar/:id', (req, res) => {
    //res.send('Actualizar adopcion');
    actualizar(req,res);
});

adoptions.delete('/eliminar/:id', (req, res) => {
    //res.send('eliminar adopcion');
    eliminar(req,res);
});

export {adoptions}