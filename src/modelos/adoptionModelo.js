import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const Adopciones = db.define("adopciones", {
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
    fechaAdopcion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

export { Adopciones };
