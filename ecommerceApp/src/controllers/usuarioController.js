import usersDb from '../../database/users_db.js';
import { Usuario } from '../models/usuario.js';

const userController = {

  register(req, res) {
    const { nombre, email } = req.body;
    const nuevoUsuario = new Usuario(usersDb.length + 1, nombre, email, "", null);
    usersDb.push(nuevoUsuario);
    return res.status(201).json(nuevoUsuario);
},

  update(req, res) {
    const idUsuario = parseInt(req.params.id);
    const usuarioActualizado = req.body; // Obtenemos el usuario actualizado enviado desde el cliente
    const usuario = usersDb.find(user => user.id_usuario === idUsuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    usuario.nombre = usuarioActualizado.nombre ?? usuario.nombre;
    usuario.email = usuarioActualizado.email ?? usuario.email;
    usuario.password = usuarioActualizado.password ?? usuario.password;
    usuario.es_corporativo = usuarioActualizado.es_corporativo ?? usuario.es_corporativo;
    return res.json(usuario);
},

  getById(req, res) {
    const idUsuario = parseInt(req.params.id);
    const usuario = usersDb.find(user => user.id_usuario === idUsuario);   
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json(usuario);
},

  remove(req, res) {
  const idUsuario = parseInt(req.params.id);
  const usuario = usersDb.find(user => user.id_usuario === idUsuario);
  if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  usersDb.splice(usersDb.indexOf(usuario), 1);
  return res.status(204).end();
}
};

export default userController;


// function es_corporativoUsuario(usuario_id) {
//   return lista_usuarios[usuario_id]?.es_corporativo || false;
// }


// function loguearUsuario(email, password) {
//   for (let id in lista_usuarios) {
//     const u = lista_usuarios[id];
//     if (u.email === email && u.password === password) {
//       sesion.usuario_id = u.id_usuario;
//       console.log(`✔️  El usuario se logueó correctamente`);
//       return true;
//     }
//   }
//   console.log(`❌ Error al loguearse`);
//   return false;
// }


// function cerrarSesion() {
//   sesion.usuario_id = null;
// }

// function estaLogueado() {
//   return sesion.usuario_id !== null;
// }

// function verificarSesion() {
//   if (!estaLogueado()) {
//     console.log(`❌ El usuario no está logueado. Redirigiendo al login...`);
//     return false;
//   }
//   console.log(`✔️  Usuario logueado: ID ${sesion.usuario_id}`);
//   return true;
// }