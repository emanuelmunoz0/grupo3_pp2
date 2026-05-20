import Usuario from './Usuario.js';
import OrdenCompra from './OrdenCompra.js';
import DetalleOrden from './DetalleOrden.js';
import Producto from './Producto.js';

// Usuario → OrdenCompra
Usuario.hasMany(OrdenCompra, { foreignKey: 'usuario_id' });
OrdenCompra.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// OrdenCompra → DetalleOrden
OrdenCompra.hasMany(DetalleOrden, { foreignKey: 'id_orden' });
DetalleOrden.belongsTo(OrdenCompra, { foreignKey: 'id_orden' });

// Producto → DetalleOrden
Producto.hasMany(DetalleOrden, { foreignKey: 'producto_id' });
DetalleOrden.belongsTo(Producto, { foreignKey: 'producto_id' });