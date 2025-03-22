const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

const tipoMascotas = sequelize.define('tipoMascotas', {
    IdTipoMascota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
    Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Tipo de Animal es requerido',
      },
      len: {
        args: [3, 50],
        msg: 'El Tipo de Animal debe tener entre 3 y 50 caracteres',
      },
    },
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: true,         // Permitido nulo, ya que puede no ser obligatorio
  },
  TamañoPromedio: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Tamaño Promedio es requerido',
      },
      len: {
        args: [3, 20],
        msg: 'El Tamaño Promedio debe tener entre 3 y 20 caracteres',
      },
    },
  },
  VidaPromedio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  NecesitaLicencia: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Valor por defecto
  }
}, {
  timestamps: false,
});

// Exportar el modelo
module.exports = { sequelize, tipoMascotas };
