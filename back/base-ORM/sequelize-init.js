const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db");

const veterinarios = sequelize.define(
  "veterinarios",
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
       validate:{
        len: {
            args: [5, 50],
            msg: "El Numero de Celular debe ser tipo caracter, entre 5 y 50 de longitud",
            },
       } 
      }
    ,
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


  },





  {
    timestamps: false,
  }
);


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
    Observacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La Observación sobre la consulta es requerida",
        },
        len: {
          args: [5, 120],
          msg: "La observación debe ser tipo caracteres, entre 5 y 120 de longitud",
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
        model: 'veterinarios', // Nombre de la tabla 'veterinarios'
        key: 'LegajoVeter', // Nombre del campo que es clave primaria en la tabla veterinarios
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  },
  {
    timestamps: false,
  }
);

// definicion del modelo de datos para mascotas
const mascotas = sequelize.define('mascotas', {
  IdMascota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TipoMascota: {
    type: DataTypes.STRING, // Ajustado a STRING
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
  IdCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
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
  Peso: {
    type: DataTypes.REAL,
  },
}, {
  timestamps: false,
});


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



module.exports = {
  sequelize,
  consultas,
  mascotas,
  clientes,
  veterinarios,
};

