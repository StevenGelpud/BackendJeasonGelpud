import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladoresDB/requestController.js";

const requestsM = express.Router();

requestsM.get('/', (req, res) => {
    res.send('Hola Sitio de Solicitudes');
});

requestsM.post('/crear', (req, res) => {
    //res.send('Crear Solicitud');
    crear(req,res);
    
});

requestsM.get('/buscar', (req, res) => {
    //res.send('Buscar Solicitud');
    buscar(req,res);
});

requestsM.get('/buscarId/:id', (req, res) => {
    //res.send('Buscar Solicitud');
    buscarId(req,res);
});

requestsM.put('/actualizar/:id', (req, res) => {
    //res.send('Actualizar Solicitud');
    actualizar(req,res);
});

requestsM.delete('/eliminar/:id', (req, res) => {
    //res.send('eliminar Solicitud');
    eliminar(req,res);
});

export {requestsM}