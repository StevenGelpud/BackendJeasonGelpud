import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Solicitudes = db.define("solicitudes", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    mascotaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'mascotas',
            key: 'id'
        }
    },
    fechaSolicitud: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendiente' //'pendiente', 'aprobada', 'rechazada'
    }
});

export { Solicitudes };

