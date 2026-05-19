import carritoDB from '../../database/carrito_db.js';
import { Carrito } from '../models/Carrito.js';

const carritoController = {

  register(req, res) {
     const ididCarrito = parseInt(req.body);
     const nuevoCarrito = newCarrito(id_carrito, usuario,ItemCarrito = []);
     carritoDB.push(nuevoCarrito);
     return res.status(201).json(nuevo.Carrito);
},

  update(req, res) {
    const idUsuario = parseInt(req.params.id);
    const carritoActualizado = req.body; // Obtenemos el carrito actualizado enviado desde el cliente
    const carrito = carritoDB.find(carrito => carrito.id_carrito === idUsuario);
  if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    carrito.usuario = carritoActualizado.usuario ?? carrito.usuario;
    carrito.ItemCarrito = carritoActualizado.ItemCarrito ?? carrito.ItemCarrito;
    return res.json(usuario);
},
  getById(req, res) {
    const idCarrito = parseInt(req.params.id);
    const carrito = carritoDB.find(carrito => carrito.id_carrito === idCarrito);
    if (!carrito) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    } 
    return res.json(carrito);
  },
  remove(req, res) {
    const idCarrito = parseInt(req.params.id);
    const carrito = carritoDB.find(carrito => carrito.id_carrito === idCarrito);  
    if (!carrito) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    } 
    carritoDB.splice(carritoDB.indexOf(carrito), 1);
    return res.status(204).end();
  } 
};
export default carritoController;
