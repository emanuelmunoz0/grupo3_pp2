import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrdenCompra = sequelize.define('OrdenCompra', {
    id_orden: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id_usuario'
        }
    },

    cupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Cupon',
            key: 'id_cupon'
        }
    },

    total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    fecha_compra: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    estado_compra: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default OrdenCompra;