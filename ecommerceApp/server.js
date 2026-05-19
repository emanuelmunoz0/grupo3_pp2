// server.js - El motor de nuestra aplicación
import express from 'express';
import sequelize from './src/config/database.js';
import productsRouter from './src/routes/products.js';
import userRouter from './src/routes/user.js';
import ordenCompraRouter from './src/routes/ordenCompra.js';
import detalleOrdenRouter from './src/routes/detalleOrden.js';

const app = express();
const PORT = 3000;

// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public"
app.use(express.static('public'));
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

app.use('/api', productsRouter);
app.use('/api', userRouter);
app.use('/api/ordenes', ordenCompraRouter);
app.use('/api/detalles', detalleOrdenRouter);

app.post('/api/checkout', (req, res) => {
    const carritoRecibido = req.body;

    console.log('Carrito recibido:', carritoRecibido);

    res.json({ message: 'Compra recibida exitosamente' });
});

// Encendemos el servidor
sequelize.sync()
.then(() => {
 app.listen(PORT, () => {
  console.log(`✅Servidor corriendo en http://localhost:${PORT}`);
 });
})
.catch((error) => {
 console.log('❌Error de conexión:', error);
});