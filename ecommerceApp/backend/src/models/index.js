// Reutilizamos la conexión principal creada en src/config/database.js.
// Esta constante representa la puerta de entrada al motor de base.
import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

import Usuario from './Usuario.js';
import OrdenCompra from './OrdenCompra.js';
import DetalleOrden from './DetalleOrden.js';
import Producto from './Producto.js';
import Categoria from './Categoria.js';

import seedDatabase from './seed.js';

// Usuario → OrdenCompra
Usuario.hasMany(OrdenCompra, { foreignKey: 'usuario_id' });
OrdenCompra.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// OrdenCompra → DetalleOrden
OrdenCompra.hasMany(DetalleOrden, { foreignKey: 'id_orden' });
DetalleOrden.belongsTo(OrdenCompra, { foreignKey: 'id_orden' });

// Producto → DetalleOrden
Producto.hasMany(DetalleOrden, { foreignKey: 'producto_id' });
DetalleOrden.belongsTo(Producto, { foreignKey: 'producto_id' });

// Categoria → Producto
Categoria.hasMany(Producto, { foreignKey: 'id_categoria', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });

async function ensureProductValidityColumns() {
    // Qué hace:
    // garantiza que existan las columnas validFrom y validTo en products.
    //
    // Por qué existe:
    // en bases creadas antes de agregar vigencia, esas columnas no están.
    // sync() crea tablas faltantes, pero no siempre resuelve este caso legado.
    //
    // Qué recibe:
    // no recibe parámetros; usa la conexión sequelize ya cargada en este módulo.
    //
    // Qué devuelve:
    // Promise<void>. Aplica cambios estructurales solo si faltan columnas.

    const queryInterface = sequelize.getQueryInterface();

    // describeTable devuelve el esquema actual de la tabla products.
    // Ejemplo: table.id, table.name, table.price, etc.
    const table = await queryInterface.describeTable('Producto');

    // Si validFrom no existe, se crea.
    // defaultValue se usa para que productos existentes no queden null
    // y sigan vigentes al migrar esta funcionalidad.
    if (!table.validoDesde) {
        await queryInterface.addColumn('Producto', 'validoDesde', {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '2000-01-01'
        });
    }

    // Si validTo no existe, se crea.
    // Se usa una fecha de cierre lejana para no vencer productos viejos
    // automáticamente al actualizar el proyecto.
    if (!table.validoHasta) {
        await queryInterface.addColumn('Producto', 'validoHasta', {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '2099-12-31'
        });
    }
}

export async function initializeDatabase() {
    // PASO 3:
    // sync() compara modelos contra la base y crea tablas faltantes.
    await sequelize.sync();

    // PASO 4:
    // garantizamos vigencia en products para bases que vienen de clases previas.
    await ensureProductValidityColumns();

    // PASO 5:
    // cargamos seed inicial (si corresponde) desde módulo separado.
    await seedDatabase({ Categoria, Producto });
}

// module.exports devuelve un objeto con varias piezas del módulo:
// - sequelize: la conexión
// - Category, Product, Client, Discount: los modelos ya cargados
// - initializeDatabase: la función de arranque
export {
    sequelize,
    Categoria,
    Producto
};