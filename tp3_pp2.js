const lista_usuarios = {};

function es_corporativoUsuario(usuario_id) {
    return lista_usuarios[usuario_id]?.es_corporativo || false;
}

class Usuario {
    constructor(id_usuario, nombre, email, password, es_corporativo) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.es_corporativo = es_corporativo;
        this.OrdenCompra = [];
    }
}

function agregarUsuario(objetoUsuario) {
    lista_usuarios[objetoUsuario.id_usuario] = objetoUsuario;
    return "Usuario agregado correctamente";
}

class OrdenCompra {
    constructor(id_orden, usuario_id, cupon_id, fecha_compra) {
        this.id_orden = id_orden;
        this.usuario_id = usuario_id;
        this.cupon_id = cupon_id;
        this.total = 0;
        this.fecha_compra = new Date(fecha_compra);
        this.estado_compra = "Pendiente";
        this.DetalleOrden = [];
    }

    agregarDetalle(detalle) {
        this.DetalleOrden.push(detalle);
    }

    calcularTotal() {
        // 1. Calcular Subtotal iterando el array de detalles
        let subTotal = this.DetalleOrden.reduce((acc, det) => acc + det.subtotalDetalleOrden(), 0);

        // 2. Aplicar Descuentos (Tu Regla de Negocio)
        let porcentajeDescuento = 0;
        if (es_corporativoUsuario(this.usuario_id)) {
            porcentajeDescuento += 10; // Regla: 10% si es corporativo
        } else if (validarCupon(this.cupon_id)) {
            porcentajeDescuento += descuentoCupon(this.cupon_id); // Regla: Cupón
        }

        let descuentoMonto = subTotal * (porcentajeDescuento / 100);

        // 3. Total Final
        return this.total = subTotal - descuentoMonto;
    }

}

class Envio {
    constructor(id_envio, orden_id, estado_envio, fecha_envio) {
        this.id_envio = id_envio;
        this.orden_id = orden_id;
        this.estado_envio = estado_envio;
        this.fecha_envio = new Date(fecha_envio);
    }
}

class Pago {
    constructor(id_pago, orden_id, estado_pago, metodo_pago, fecha_pago) {
        this.id_pago = id_pago;
        this.orden_id = orden_id;
        this.estado_pago = estado_pago;
        this.metodo_pago = metodo_pago;
        this.fecha_pago = new Date(fecha_pago);
    }
}

const lista_cupones = {};

function validarCupon(cupon_id) {
    const hoy = new Date();

    if (cupon_id in lista_cupones) {
        if (lista_cupones[cupon_id].fecha_vencimiento < hoy) {
            lista_cupones[cupon_id].activo = false;
        }
        return lista_cupones[cupon_id].activo;
    } else { return false; }
}

function descuentoCupon(cupon_id) {
    if (cupon_id in lista_cupones) { return lista_cupones[cupon_id].descuento };
}

class Cupon {
    constructor(id_cupon, nombre, descuento, fecha_vencimiento, activo) {
        this.id_cupon = id_cupon;
        this.nombre = nombre;
        this.descuento = descuento;
        this.fecha_vencimiento = new Date(fecha_vencimiento);
        this.activo = activo;
    }
}

function agregarCupon(objetoCupon) {
    lista_cupones[objetoCupon.id_cupon] = objetoCupon;
    return "Cupón agregado correctamente";
}

class DetalleOrden {
    constructor(id_orden, id_detalle, producto_id, cantidad, precio_unitario) {
        this.id_orden = id_orden;
        this.id_detalle = id_detalle;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
    }

    subtotalDetalleOrden() {
        return this.cantidad * this.precio_unitario;
    }
}

class Producto {
    constructor(id_producto, nombre, precio, stock) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    hayStock(cantidadRequerida) {
        return this.stock >= cantidadRequerida;
    }

    reducirStock(cantidad) {
        this.stock -= cantidad;
    }
}

class ItemCarrito {
    constructor(id_carrito, id_item, producto_id, cantidad) {
        this.id_carrito = id_carrito;
        this.id_item = id_item;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
    }
}

class Carrito {
    constructor(id_carrito, usuario_id) {
        this.id_carrito = id_carrito;
        this.usuario_id = usuario_id;
        this.ItemCarrito = [];
    }
}