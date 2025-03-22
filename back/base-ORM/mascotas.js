const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

const mascotas = sequelize.define('mascotas', {
  IdMascota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IdTipoMascota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tipoMascotas',
      key: 'IdTipoMascota'
    },
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Tipo de Animal es requerido',
      },
    },
},

  IdCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes', // Nombre de la tabla a la que hace referencia
      key: 'id'         // Columna de la tabla 'clientes' a la que apunta (su PK)
    },
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Id del Cliente es requerido',
      },
    },
  },
  NombreMascota: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'El Nombre del Animal es requerido',
      },
      len: {
        args: [3, 20],
        msg: 'El Nombre del Animal debe tener entre 3 y 20 caracteres',
      },
    },
  },
  FechaNacMascota: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
});

module.exports = { sequelize, mascotas };
