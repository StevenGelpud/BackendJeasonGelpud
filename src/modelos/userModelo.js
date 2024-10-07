import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Usuarios = db.define("usuarios", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefono: {
        type: Sequelize.STRING,
        allowNull: true
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fecha_registro: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false // Por defecto es false
    }
});

export { Usuarios };