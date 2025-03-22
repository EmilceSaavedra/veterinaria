const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

// definicion del modelo de datos para los tratamientos
const tratamientos = sequelize.define("tratamientos",  {
  IdTratamiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

   NombreTratamiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del tratamiento es requerido",
        },
        len: {
          args: [5, 120],
          msg: "El nombre del tratamiento debe ser de tipo caracteres, entre 5 y 120 de longitud",
        },
      },
    },

  Descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La descripcion del tratamiento es requerida",
        },

      },

    },
  
  },


  {
    timestamps: false,
  }
);




module.exports = {sequelize, tratamientos}

