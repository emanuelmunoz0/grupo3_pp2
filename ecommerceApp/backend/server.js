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
import { authenticateToken } from './src/middlewares/authMiddleware.js';
import {
    initializeDatabase,
    Producto,
    Cupon,
    OrdenCompra,
    DetalleOrden,
    sequelize
} from './src/models/index.js';
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

function normalizeCouponCode(value) {
    return String(value ?? '').trim().toUpperCase();
}

function toDateOnly(value) {
    return String(value ?? new Date().toISOString()).slice(0, 10);
}

function normalizeDiscountValue(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) {
        return 0;
    }

    return amount <= 1 ? amount * 100 : amount;
}

function isCouponValidNow(coupon, today = toDateOnly()) {
    const discount = normalizeDiscountValue(coupon.descuento);
    const validFrom = toDateOnly(coupon.validoDesde || coupon.fecha_vencimiento || '2000-01-01');
    const validTo = toDateOnly(coupon.validoHasta || coupon.fecha_vencimiento || '2099-12-31');

    return coupon.activo !== false && discount === 10 && validFrom <= today && today <= validTo;
}

app.post('/api/checkout', authenticateToken, async (req, res) => {
    try {
        const items = Array.isArray(req.body?.items) ? req.body.items : [];
        const couponCode = normalizeCouponCode(req.body?.couponCode);
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
            let coupon = null;
            let couponId = null;
            let subtotal = 0;

            if (couponCode) {
                coupon = await Cupon.findOne({
                    where: { nombre: couponCode },
                    transaction,
                });

                if (!coupon) {
                    throw new Error('El cupón ingresado no existe');
                }

                if (!isCouponValidNow(coupon)) {
                    throw new Error('El cupón no está activo o fuera de vigencia');
                }

                couponId = coupon.id_cupon;
            }

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

                subtotal += Number(producto.precio ?? 0) * quantity;
            }

            const discountAmount = couponId ? subtotal * 0.1 : 0;
            const total = Math.max(0, subtotal - discountAmount);

            const orden = await OrdenCompra.create(
                {
                    usuario_id: Number(req.user.id),
                    cupon_id: couponId,
                    total,
                    fecha_compra: toDateOnly(),
                    estado_compra: 'Generada',
                },
                { transaction }
            );

            const purchasedItems = [];
            for (const [productId, quantity] of normalizedItems.entries()) {
                const producto = await Producto.findByPk(productId, { transaction });
                const previousStock = Number(producto.stock ?? 0) + quantity;
                const newStock = Number(producto.stock ?? 0);

                const detalle = await DetalleOrden.create(
                    {
                        id_orden: orden.id_orden,
                        producto_id: productId,
                        cantidad: quantity,
                        precio_unitario: Number(producto.precio ?? 0),
                    },
                    { transaction }
                );

                purchasedItems.push({
                    productId,
                    quantity,
                    previousStock,
                    newStock,
                    detalleId: detalle.id_detalle,
                });
            }

            return {
                ordenId: orden.id_orden,
                purchasedItems,
                subtotal,
                total,
                couponId,
            };
        });

        res.json({
            message: 'Compra finalizada correctamente',
            orderId: result.ordenId,
            subtotal: result.subtotal,
            total: result.total,
            cupon_id: result.couponId,
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
