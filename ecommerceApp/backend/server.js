// server.js - El motor de nuestra aplicación
import express from 'express';
import productsRouter from './src/routes/products.js';
import userRouter from './src/routes/user.js';
import ordenCompraRouter from './src/routes/ordenCompra.js';
import detalleOrdenRouter from './src/routes/detalleOrden.js';
import carritoRouter from './src/routes/carrito.js';
import cuponRouter from './src/routes/cupon.js';
import categoriaRouter from './src/routes/categoria.js';
import authRouter from './src/routes/auth.js';
import { initializeDatabase, Producto, sequelize } from './src/models/index.js';
import 'dotenv/config';

const app = express();
const PORT = 3000;

// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public"
app.use(express.static("../frontend"));
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

app.use('/api', productsRouter);
app.use('/api', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/ordenes', ordenCompraRouter);
app.use('/api/detalles', detalleOrdenRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/cupon', cuponRouter);
app.use('/api/categorias', categoriaRouter);

app.post('/api/checkout', async (req, res) => {
    try {
        const items = Array.isArray(req.body?.items) ? req.body.items : [];
        const normalizedItems = new Map();

        for (const item of items) {
            const productId = Number(item?.productId ?? item?.id ?? item?.product?.id);
            const quantity = Number.parseInt(item?.quantity ?? 0, 10);

            if (!Number.isInteger(productId) || productId <= 0) {
                return res.status(400).json({ error: 'Hay un producto inválido en el carrito' });
            }

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({ error: 'La cantidad de un producto es inválida' });
            }

            normalizedItems.set(productId, (normalizedItems.get(productId) ?? 0) + quantity);
        }

        if (normalizedItems.size === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        const result = await sequelize.transaction(async (transaction) => {
            const purchasedItems = [];
            let subtotal = 0;

            for (const [productId, quantity] of normalizedItems.entries()) {
                const producto = await Producto.findByPk(productId, { transaction });

                if (!producto) {
                    throw new Error(`El producto ${productId} no existe`);
                }

                if (Number(producto.stock ?? 0) < quantity) {
                    throw new Error(`No hay stock suficiente para "${producto.nombre}"`);
                }

                const previousStock = Number(producto.stock ?? 0);
                const newStock = previousStock - quantity;

                await producto.update({ stock: newStock }, { transaction });

                purchasedItems.push({
                    productId,
                    quantity,
                    previousStock,
                    newStock,
                });

                subtotal += Number(producto.precio ?? 0) * quantity;
            }

            return {
                purchasedItems,
                subtotal,
            };
        });

        res.json({
            message: 'Compra finalizada correctamente',
            subtotal: result.subtotal,
            items: result.purchasedItems,
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'No se pudo finalizar la compra' });
    }
});

// Encendemos el servidor
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('❌Error de conexión:', error);
    });
