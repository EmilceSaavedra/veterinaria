const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

// definicion del modelo de datos para clientes
const clientes = sequelize.define('clientes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  apellido: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'El apellido es requerido',
      },
      len: {
        args: [4, 30],
        msg: 'El apellido debe tener entre 4 y 30 caracteres',
      },
    },
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Nombre es requerido',
      },
      len: {
        args: [4, 30],
        msg: 'El Nombre debe tener entre 4 y 30 caracteres',
      },
    },
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La fecha de nacimiento es requerida',
      },
    },
  },
  direccion: {
    type: DataTypes.STRING(100), // Ajustado a una longitud mayor según tus necesidades
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La dirección es requerida',
      },
    },
  },
}, {
  timestamps: false,
});

module.exports = {sequelize, clientes}