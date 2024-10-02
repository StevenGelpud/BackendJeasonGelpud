// src/models/index.js
import { Mascotas } from './mascotaModelo.js';
import { Usuarios } from './userModelo.js';
import { Adopciones } from './adoptionModelo.js';
import { Solicitudes } from './requestModelo.js';

// Definición de relaciones
Usuarios.hasMany(Solicitudes, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Solicitudes.belongsTo(Usuarios, { foreignKey: 'id_usuario' });

Usuarios.hasMany(Adopciones, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Adopciones.belongsTo(Usuarios, { foreignKey: 'id_usuario' });

Mascotas.hasMany(Adopciones, { foreignKey: 'id_mascota', onDelete: 'CASCADE' });
Adopciones.belongsTo(Mascotas, { foreignKey: 'id_mascota' });

Mascotas.hasMany(Solicitudes, { foreignKey: 'id_mascota', onDelete: 'CASCADE' });
Solicitudes.belongsTo(Mascotas, { foreignKey: 'id_mascota' });

export { Mascotas, Usuarios, Adopciones, Solicitudes };
