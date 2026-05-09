function ingresarDatosEnvio(datosEnvio) {
  const envio = new Envio(
    Date.now(),
    null,
    "Pendiente",
    new Date().toISOString(),
  );
  console.log(`🚚 Datos de envío registrados:`);
  console.log(`   Dirección : ${datosEnvio.direccion}`);
  console.log(`   Ciudad    : ${datosEnvio.ciudad}`);
  console.log(`   Provincia : ${datosEnvio.provincia}`);
  console.log(`   CP        : ${datosEnvio.codigo_postal}`);
  return envio;
}

const envioController = {
  getAll: (req, res) => {
    res.json({ message: "Obtener todos los envíos" });
  },

  getById: (req, res) => {
    const id = Number(req.params.id);
    const envio = buscarEnvio(id);

    if (envio) {
      return res.json(envio);
    }
    res.json({ error: `Envío con ID: ${id} no encontrado` });
  },
  create: (req, res) => {
    const datosEnvio = req.body;
    const envio = ingresarDatosEnvio(datosEnvio);
    return res.json(envio);
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const datosEnvio = req.body;
    const envio = buscarEnvio(id);

    if (envio) {
      // Lógica para actualizar el envío
      return res.json({ message: `Envío con ID: ${id} actualizado` });
    }
    res.json({ error: `Envío con ID: ${id} no encontrado` });
  },
  remove: (req, res) => {
    const id = Number(req.params.id);
    const envio = buscarEnvio(id);

    if (envio) {
      // Lógica para eliminar el envío
      return res.json({ message: `Envío con ID: ${id} eliminado` });
    }
    res.json({ error: `Envío con ID: ${id} no encontrado` });
  }
}

