import Sequelize  from "sequelize";

//conexion con la base de Datos 
const db = new Sequelize("ad_mascotas","trabajos","trabajos",{
    dialect: "mysql",
    host: "localhost"
});

export {db}