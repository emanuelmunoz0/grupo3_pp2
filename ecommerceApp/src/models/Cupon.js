import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cupon = sequelize.define('Cupon', {
  id_cupon: {
    type: DataTypes.INTEGER,  
    primaryKey: true,
    autoIncrement: true
  },  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

export default Cupon;