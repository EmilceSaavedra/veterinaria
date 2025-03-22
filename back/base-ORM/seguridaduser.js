const { Sequelize, DataTypes } = require('sequelize');

// Configuración de Sequelize con reducción de logs
const sequelize = new Sequelize("sqlite:" + "./.data/veterinaria.db", {
    logging: false // Cambia a `console.log` si quieres ver los logs SQL en caso de depuración
});

// Definición del modelo User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'miembro']]
        }
    }
}, {
    timestamps: true,
    tableName: 'users',
    freezeTableName: true
});

// Función de inicialización
const initializeDatabase = async () => {
    try {
        // Sincronizar tabla con alteración en lugar de recreación
        await User.sync({ alter: true });
        console.log("Tabla users sincronizada correctamente");
    } catch (error) {
        console.error("Error sincronizando tabla users:", error);
        throw error;
    }
};

// Ejecutar inicialización
initializeDatabase();

module.exports = User;
