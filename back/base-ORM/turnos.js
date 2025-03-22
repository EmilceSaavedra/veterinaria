const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

// definicion del modelo de datos para los turnos
const turnos = sequelize.define('turnos', {
  IdTurno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Apellido: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Apellido es requerido',
      },
      len: {
        args: [4, 30],
        msg: 'El apellido debe tener entre 4 y 30 caracteres',
      },
    },
  },
  Nombre: {
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
  Fecha:{
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Activo es requerido",
      }
    }
  },
}, {
  timestamps: false,
});

module.exports = {sequelize, turnos}