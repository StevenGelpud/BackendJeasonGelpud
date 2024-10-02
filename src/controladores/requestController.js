import { Solicitudes } from "../modelos/requestModelo.js";

// Crear solicitud
const crear = async (req, res) => {
    const { usuarioId, mascotaId } = req.body;

    if (!usuarioId || !mascotaId) {
        return res.status(400).json({ mensaje: "Usuario y mascota son obligatorios." });
    }

    try {
        const nuevaSolicitud = await Solicitudes.create({ usuarioId, mascotaId });
        res.status(201).json({ mensaje: "Solicitud creada con éxito", solicitud: nuevaSolicitud });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al crear la solicitud: ${err}` });
    }
};

// Buscar solicitudes
const buscar = async (req, res) => {
    try {
        const solicitudes = await Solicitudes.findAll();
        res.status(200).json(solicitudes);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar solicitudes: ${err}` });
    }
};

// Buscar por ID
const buscarId = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    try {
        const solicitud = await Solicitudes.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ mensaje: "Solicitud no encontrada." });
        }
        res.status(200).json(solicitud);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar la solicitud: ${err}` });
    }
};

// Actualizar solicitud
const actualizar = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!id || !estado) {
        return res.status(400).json({ mensaje: "ID y estado son obligatorios." });
    }

    try {
        await Solicitudes.update({ estado }, { where: { id } });
        res.status(200).json({ mensaje: "Solicitud actualizada con éxito." });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al actualizar la solicitud: ${err}` });
    }
};

// Eliminar solicitud
const eliminar = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    try {
        const resultado = await Solicitudes.destroy({ where: { id } });
        if (!resultado) {
            return res.status(404).json({ mensaje: "Solicitud no encontrada." });
        }
        res.status(200).json({ mensaje: `Solicitud con ID ${id} eliminada con éxito.` });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al eliminar la solicitud: ${err}` });
    }
};

export { crear, buscar, buscarId, actualizar, eliminar };
