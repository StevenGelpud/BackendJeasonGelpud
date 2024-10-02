import { Usuarios } from "../modelos/userModelo.js";
import bcrypt from "bcrypt";

// Crear un recurso Usuario
const crear = async (req, res) => {
    const { nombre, email, password, telefono, direccion } = req.body;

    // Validar datos
    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: "Nombre, email y contraseña son obligatorios." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuarios.create({
            nombre,
            email,
            password: hashedPassword,
            telefono,
            direccion
        });
        res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al crear el usuario: ${err}` });
    }
};

// Buscar usuarios
const buscar = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar usuarios: ${err}` });
    }
};

// Buscar por ID
const buscarId = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar el usuario: ${err}` });
    }
};

// Actualizar usuario
const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, direccion } = req.body;

    if (!id || (!nombre && !email && !telefono && !direccion)) {
        return res.status(400).json({ mensaje: "Datos insuficientes para actualizar." });
    }

    try {
        await Usuarios.update({ nombre, email, telefono, direccion }, { where: { id } });
        res.status(200).json({ mensaje: "Usuario actualizado con éxito." });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al actualizar el usuario: ${err}` });
    }
};

// Eliminar usuario
const eliminar = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    try {
        const resultado = await Usuarios.destroy({ where: { id } });
        if (!resultado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }
        res.status(200).json({ mensaje: `Usuario con ID ${id} eliminado con éxito.` });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al eliminar el usuario: ${err}` });
    }
};

export { crear, buscar, buscarId, actualizar, eliminar };
