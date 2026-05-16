class Cupon {
  constructor(id_cupon, nombre, descuento, fecha_vencimiento, activo) {
    this.id_cupon = id_cupon;
    this.nombre = nombre;
    this.descuento = descuento / 100;
    this.fecha_vencimiento = new Date(fecha_vencimiento);
    this.activo = activo;
  }
}

const lista_cupones = {};

function crearCupon(objetoCupon) {
  lista_cupones[objetoCupon.id_cupon] = objetoCupon;
  console.log(`✔️  Se creó el cupón con nombre ${objetoCupon.nombre}`);
}

function validarCupon(cupon_id) {
  const hoy = new Date();
  if (cupon_id in lista_cupones) {
    if (lista_cupones[cupon_id].fecha_vencimiento < hoy) {
      lista_cupones[cupon_id].activo = false;
    }
    return lista_cupones[cupon_id].activo;
  }
  return false;
}

function descuentoCupon(cupon_id) {
  if (cupon_id in lista_cupones) {
    return lista_cupones[cupon_id].descuento;
  }
}

// 