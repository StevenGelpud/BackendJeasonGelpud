import { Adopciones } from "../modelos/adoptionModelo.js";

// Crear adopción
const crear = async (req, res) => {
    const { usuarioId, mascotaId } = req.body;

    if (!usuarioId || !mascotaId) {
        return res.status(400).json({ mensaje: "Usuario y mascota son obligatorios." });
    }

    try {
        const nuevaAdopcion = await Adopciones.create({ usuarioId, mascotaId });
        res.status(201).json({ mensaje: "Adopción creada con éxito", adopcion: nuevaAdopcion });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al crear la adopción: ${err}` });
    }
};

// Buscar adopciones
const buscar = async (req, res) => {
    try {
        const adopciones = await Adopciones.findAll();
        res.status(200).json(adopciones);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar adopciones: ${err}` });
    }
};

// Buscar por ID
const buscarId = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    try {
        const adopcion = await Adopciones.findByPk(id);
        if (!adopcion) {
            return res.status(404).json({ mensaje: "Adopción no encontrada." });
        }
        res.status(200).json(adopcion);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar la adopción: ${err}` });
    }
};

//Actualizar 
const actualizar = (req, res) => {
    const id = req.params.id;

    // Validar que se proporcionó un ID
    if (!id) {
        return res.status(400).json({ mensaje: "El ID es obligatorio." });
    }

    // Extraer los datos que deseas actualizar
    const { usuarioId, mascotaId } = req.body;

    // Verificar que al menos uno de los campos esté presente
    if (!usuarioId && !mascotaId) {
        return res.status(400).json({ mensaje: "Al menos uno de los campos (usuarioId o mascotaId) es obligatorio para actualizar." });
    }

    Adopciones.update(req.body, { where: { id } })
        .then((resultado) => {
            if (resultado[0] === 1) {
                res.status(200).json({ mensaje: "Adopción actualizada con éxito." });
            } else {
                res.status(404).json({ mensaje: "Adopción no encontrada." });
            }
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error al actualizar la adopción: ${err.message}` });
        });
};

// Eliminar adopción
const eliminar = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    try {
        const resultado = await Adopciones.destroy({ where: { id } });
        if (!resultado) {
            return res.status(404).json({ mensaje: "Adopción no encontrada." });
        }
        res.status(200).json({ mensaje: `Adopción con ID ${id} eliminada con éxito.` });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al eliminar la adopción: ${err}` });
    }
};

export { crear, buscar, buscarId,actualizar,eliminar };