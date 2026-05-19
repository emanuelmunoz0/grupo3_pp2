import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DetalleOrden = sequelize.define('DetalleOrden', {
    id_orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'OrdenCompra',
            key: 'id_orden'
        }
    },

    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Producto',
            key: 'id_producto'
        }
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    precio_unitario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default DetalleOrden;