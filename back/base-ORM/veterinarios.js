const { Sequelize, DataTypes } = require("sequelize"); 
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

// Definición del modelo Especialidades
const Especialidades = sequelize.define(
  "Especialidades",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Definición del modelo Veterinarios
const Veterinarios = sequelize.define(
  "Veterinarios",
  {
    legajo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Nombre es Requerido",
        },
        len: {
          args: [2, 120],
          msg: "El Nombre debe ser tipo caracter, entre 2 y 120 de longitud",
        },
      },
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La Matricula es Requerida",
        },
        len: {
          args: [5, 10],
          msg: "La Matricula debe ser tipo caracter, entre 5 y 10 de longitud",
        },
      },
    },
    fechaRegistro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La Fecha de Registro es requerida",
        },
      },
    },
    celular: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: {
          args: [5, 50],
          msg: "El Numero de Celular debe ser tipo caracter, entre 5 y 50 de longitud",
        },
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Activo es Requerido",
        },
      },
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      references: {
        model: Especialidades,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Establecer la relación
Veterinarios.belongsTo(Especialidades, { foreignKey: 'idEspecialidad' });
Especialidades.hasMany(Veterinarios, { foreignKey: 'idEspecialidad' });

module.exports = { sequelize, Veterinarios, Especialidades };
