import express from "express";
//import {crear,buscar,buscarId,actualizar,eliminar} from "../controladores/mascotasController.js";

const company = express.Router();

company.get('/', (req, res) => {
    res.send('Información de la empresa');
});

export {company}