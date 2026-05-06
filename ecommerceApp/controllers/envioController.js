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