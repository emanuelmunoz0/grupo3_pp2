function registrarUsuario(objetoUsuario) {
  lista_usuarios[objetoUsuario.id_usuario] = objetoUsuario;
  if (objetoUsuario.es_corporativo) {
    console.log(
      `🧍${objetoUsuario.nombre} ha sido registrado/a correctamente como usuario corporativo`,
    );
  } else {
    console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente`);
  }
}

function es_corporativoUsuario(usuario_id) {
  return lista_usuarios[usuario_id]?.es_corporativo || false;
}

function buscarUsuario(id_usuario) {
  if (id_usuario in lista_usuarios) {
    return lista_usuarios[id_usuario];
  } else {
    return false;
  }
}