const { mascotas } = require('./mascotas');
const { clientes } = require('./clientes');
const { tipoMascotas } = require('./tipoMascotas');

// Una mascota pertenece a un cliente
mascotas.belongsTo(clientes, { foreignKey: 'IdCliente' });

// Una mascota pertenece a un tipo de mascota
mascotas.belongsTo(tipoMascotas, { foreignKey: 'IdTipoMascota' });

module.exports = { mascotas, };

