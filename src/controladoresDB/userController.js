import { Usuarios } from "../modelos/userModelo.js"; // Ajusta según tu estructura
import bcrypt from "bcrypt"; // Usa bcrypt
import { Op } from "sequelize";

// Crear un recurso Usuario
const crear = async (req, res) => {
    const { nombre, email, password, telefono, direccion,admin } = req.body;

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
            direccion,
            admin
        });
        res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al crear el usuario: ${err.message}` });
    }
};

// Buscar usuarios
const buscar = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar usuarios: ${err.message}` });
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
        res.status(500).json({ mensaje: `Error al buscar el usuario: ${err.message}` });
    }
};

// Buscar usuarios por email
const buscarPorEmail = async (req, res) => {
    const { email, password } = req.params; // Ahora recibe el email y la contraseña desde los parámetros de la URL

    // Validar que ambos campos estén presentes
    if (!email || !password) {
        return res.status(400).json({ mensaje: "Email y contraseña son obligatorios." });
    }

    try {
        // Buscar el usuario por email
        const usuario = await Usuarios.findOne({ where: { email } });
        console.log("Email recibido:", email);
        console.log("Usuario encontrado:", usuario);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }

        // Verificar si la contraseña coincide
        const esContrasenaCorrecta = await bcrypt.compare(password, usuario.password);
        console.log("Contraseña proporcionada:", password);
        console.log("Contraseña almacenada:", usuario.password); // Esta es la hasheada
        console.log("¿La contraseña es correcta?", esContrasenaCorrecta);

        if (!esContrasenaCorrecta) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta." });
        }

        // Devolver el usuario con el campo admin
        const resultado = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            admin: usuario.admin
        };

        res.status(200).json([resultado]);
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar usuario: ${err.message}` });
    }
};




// Actualizar usuario
const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, direccion, admin } = req.body;

    // Verificar si el ID es válido y al menos un campo para actualizar está presente
    if (!id || (!nombre && !email && !telefono && !direccion && admin === undefined)) {
        return res.status(400).json({ mensaje: "Datos insuficientes para actualizar." });
    }

    try {
        // Actualizar solo los campos que se han enviado
        const updatedFields = {};
        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (email !== undefined) updatedFields.email = email;
        if (telefono !== undefined) updatedFields.telefono = telefono;
        if (direccion !== undefined) updatedFields.direccion = direccion;
        if (admin !== undefined) updatedFields.admin = admin;

        await Usuarios.update(updatedFields, { where: { id } });

        res.status(200).json({ mensaje: "Usuario actualizado con éxito." });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al actualizar el usuario: ${err.message}` });
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
        res.status(500).json({ mensaje: `Error al eliminar el usuario: ${err.message}` });
    }
};

// Buscar usuario por email y devolver ID
const buscarIdPorEmail = async (req, res) => {
    const { email } = req.params; // Recibe el email desde los parámetros de la URL

    // Validar que el campo email esté presente
    if (!email) {
        return res.status(400).json({ mensaje: "El email es obligatorio." });
    }

    try {
        // Buscar el usuario por email
        const usuario = await Usuarios.findOne({ where: { email } });
        
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }

        // Devolver el ID del usuario encontrado
        res.status(200).json({ id: usuario.id });
    } catch (err) {
        res.status(500).json({ mensaje: `Error al buscar usuario: ${err.message}` });
    }
};

// Exportar el nuevo método
export { crear, buscar, buscarId, buscarIdPorEmail, actualizar, eliminar, buscarPorEmail };