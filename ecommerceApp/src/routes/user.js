import express from 'express';
import usersDb from '../../database/users_db.js';

const router = express.Router();

router.post('/register', (req, res) => {
    const nuevoUsuario = req.body; // Obtenemos el nuevo usuario enviado desde el cliente
    usersDb.push(nuevoUsuario);
    console.log('Usuario registrado:', nuevoUsuario); // Imprimimos el nuevo usuario en la consola para verificar su contenido
    res.json({ message: 'Usuario registrado exitosamente' }); // Respondemos con un mensaje de éxito
});

router.put('/usuarios/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const usuarioActualizado = req.body; // Obtenemos el usuario actualizado enviado desde el cliente
    const usuario = usersDb.find(user => user.id_usuario === idUsuario);
    if (usuario) {
        usuario.nombre = usuarioActualizado.nombre ?? usuario.nombre;
        usuario.email = usuarioActualizado.email ?? usuario.email;
        usuario.password = usuarioActualizado.password ?? usuario.password;
        usuario.es_corporativo = usuarioActualizado.es_corporativo ?? usuario.es_corporativo;
        console.log('Usuario actualizado:', usuario);
        res.json(usuario);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

router.get('/usuarios/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const usuario = usersDb.find(user => user.id_usuario === idUsuario);   
    if (usuario) {
        console.log('Usuario encontrado:', usuario);
        res.json(usuario);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }   
});

router.delete('/usuarios/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const usuario = usersDb.find(user => user.id_usuario === idUsuario);
    if (usuario) {
        usersDb.splice(usersDb.indexOf(usuario), 1);
        console.log(usersDb);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

export default router;

