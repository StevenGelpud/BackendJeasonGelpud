import express from "express";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import {db} from "./database/conexion.js";
import cors from "cors";
//Crear instancia de Express
const app = express();
//Cors
app.use(cors());
//Middleware JSON
app.use(express.json());

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta ${err}`);
});


//Definir Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido al sitio de adopción de mascotas');
});

//Llamar rutas de mascotas
app.use("/mascotas",routerMascotas);

//Puerto de Servidor
const PORT=4000;

// sincronizacion con la base de datos 
db.sync().then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos ${err}`);
});




