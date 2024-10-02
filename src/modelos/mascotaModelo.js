import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Mascotas = db.define("mascotas", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    especie: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    raza: {
        type: Sequelize.STRING,
        allowNull: true    
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    estado_adopcion: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    imagen_url: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

export { Mascotas };

