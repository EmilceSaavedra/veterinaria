const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

// definicion del modelo de datos para las consultas
const consultas = sequelize.define(
  "consultas",
  {
    IdConsulta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true,
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La Fecha de la consulta es requerida",
        },
      },
    },

    Precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Precio es requerido",
        },
        min: {
          args: 1,
          msg: "El Precio debe ser mayor que cero",
        }
      },
    },
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El IdCliente es requerido",
        },
      },
      references: {
        model: 'clientes', // Nombre de la tabla 'clientes'
        key: 'IdCliente', // Nombre del campo que es clave primaria en la tabla clientes
      },
      onUpdate: 'CASCADE', // Actualiza en cascada si el id cambia
      onDelete: 'RESTRICT', // Evita eliminar un cliente que esté asociado a una consulta
    },
    LegajoVeter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El LegajoVeter es requerido",
        },
      },
      references: {
        model: 'veterinarios', // Nombre de la tabla en Sequelize
        key: 'legajo',         // Nombre correcto de la clave primaria
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',

    },
    IdTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El IdTratamiento es requerido",
        },
      },
      references: {
        model: 'tratamientos', 
        key: 'IdTratamiento', 
      },
      onUpdate: 'CASCADE', 
      onDelete: 'RESTRICT', 
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {sequelize, consultas}