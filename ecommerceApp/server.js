// server.js - El motor de nuestra aplicación
import express from 'express';
import productsRouter from './src/routes/products.js';
import userRouter from './src/routes/user.js';
import sequelize from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = 3000;
// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public"
app.use(express.static("public"));
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

app.use("/api", productsRouter);
app.use("/api", userRouter);

app.post("/api/checkout", (req, res) => {
  const carritoRecibido = req.body; // Obtenemos el carrito enviado desde el cliente
  console.log("Carrito recibido:", carritoRecibido); // Imprimimos el carrito en la consola para verificar su contenido
  res.json({ message: "Compra recibida exitosamente" }); // Respondemos con un mensaje de éxito
});

// Encendemos el servidor

sequelize.sync()
 .then(() => {
 console.log('✅Base de datos conectada y sincronizada');
 app.listen(PORT, () => {
 console.log(`🚀Servidor corriendo en http://localhost:${PORT}`);
 });
 })
 .catch((err) => console.log('❌Error de conexión:', err));
