// src/controladores/mascotasController.js
import { Mascotas } from "../modelos/mascotaModelo.js";

// Crear un recurso Mascota
const crear = (req, res) => {
    const { nombre, especie, raza, edad, tamaño, descripcion, estado_adopcion, imagen_url } = req.body;

    if (!nombre || !especie || !edad) {
        return res.status(400).json({ mensaje: "El nombre, la especie y la edad son obligatorios." });
    }

    const dataset = {
        nombre,
        especie,
        raza,
        edad,
        descripcion,
        estado_adopcion: estado_adopcion || false,
        fecha_ingreso: new Date(),
        imagen_url
    };

    Mascotas.create(dataset)
        .then((resultado) => {
            res.status(201).json({ mensaje: "Registro de Mascota Creado con Éxito" });
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error al crear la mascota ::: ${err}` });
        });
}

// Buscar Mascotas
const buscar = (req, res) => {
    Mascotas.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error al buscar mascotas ::: ${err}` });
        });
}

// Buscar por ID
const buscarId = (req, res) => {
    const id = req.params.id;

    Mascotas.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensaje: "Mascota no encontrada" });
            }
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error al buscar la mascota ::: ${err}` });
        });
}

// Actualizar Mascota
const actualizar = (req, res) => {
    const id = req.params.id;

    Mascotas.update(req.body, { where: { id } })
        .then((resultado) => {
            if (resultado[0] === 1) {
                res.status(200).json({ mensaje: "Registro Actualizado" });
            } else {
                res.status(404).json({ mensaje: "Mascota no encontrada" });
            }
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error al actualizar el registro ::: ${err}` });
        });
}


// Eliminar Mascota
const eliminar = (req, res) => {
    const id = req.params.id;

    Mascotas.destroy({ where: { id } })
        .then((resultado) => {
            if (resultado === 1) {
                res.status(200).json({ mensaje: `Registro con ID ${id} Eliminado Correctamente` });
            } else {
                res.status(404).json({ mensaje: "Mascota no encontrada" });
            }
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error al eliminar el registro ::: ${err}` });
        });
};

export { crear, buscar, buscarId, actualizar, eliminar };