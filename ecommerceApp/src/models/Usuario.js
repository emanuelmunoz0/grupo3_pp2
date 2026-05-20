import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    es_corporativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    orden_compra: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    freezeTableName: true
});

export default Usuario;