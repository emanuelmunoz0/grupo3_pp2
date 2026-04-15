class Usuario {
    constructor (id_usuario, nombre, email, password, es_corporativo) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.es_corporativo = es_corporativo;
        this.OrdenCompra = [];
    }
}

class OrdenCompra {
    constructor (id_orden, usuario_id, cupon_id, total, fecha_compra, estado_compra) {
        this.id_orden = id_orden;
        this.usuario_id = usuario_id;
        this.cupon_id = cupon_id;
        this.total = total;
        this.fecha_compra = fecha_compra;
        this.estado_compra = estado_compra;
        this.DetalleOrden = [];
    }
}

class Envio {
    constructor (id_envio, orden_id, estado_envio, fecha_envio) {
        this.id_envio = id_envio;
        this.orden_id = orden_id;
        this.estado_envio = estado_envio;
        this.fecha_envio = fecha_envio;
    }
}

class Pago {
    constructor (id_pago, orden_id, estado_pago, metodo_pago, fecha_pago) {
        this.id_pago = id_pago;
        this.orden_id = orden_id;
        this.estado_pago = estado_pago;
        this.metodo_pago = metodo_pago;
        this.fecha_pago = fecha_pago;
    }
}

class Cupon {
    constructor (id_cupon, nombre, descuento, fecha_vencimiento, activo) {
        this.id_cupon = id_cupon;
        this.nombre = nombre;
        this.descuento = descuento;
        this.fecha_vencimiento = fecha_vencimiento;
        this.activo = activo;
    }
}

class DetalleOrden {
    constructor (id_orden, id_detalle, producto_id, cantidad, precio_unitario) {
        this.id_orden = id_orden;
        this.id_detalle = id_detalle;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
        this.OrdenCompra = [];
    }
}

class Producto {
    constructor (id_producto, nombre, precio, stock) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

class ItemCarrito {
    constructor (id_carrito, id_item, producto_id, cantidad) {
        this.id_carrito = id_carrito;
        this.id_item = id_item;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
    }
}

class Carrito {
    constructor (id_carrito, usuario_id) {
        this.id_carrito = id_carrito;
        this.usuario_id = usuario_id;
        this.ItemCarrito = [];
    }
}