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

const lista_usuarios = {};

function registrarUsuario(objetoUsuario) {
    lista_usuarios[objetoUsuario.id_usuario] = objetoUsuario;
    if (objetoUsuario.es_corporativo) {
        console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente como usuario corporativo`);
    } else {
        console.log(`🧍${objetoUsuario.nombre} ha sido registrado/a correctamente`);
    }
}

function es_corporativoUsuario(usuario_id) {
    return lista_usuarios[usuario_id]?.es_corporativo || false;
}

function buscarUsuario(id_usuario) {
    if (id_usuario in lista_usuarios) { return lista_usuarios[id_usuario] } else { return false }
}

function loguearUsuario(email, password) {
    let valido = false;
    for (let id in lista_usuarios) {
        if (lista_usuarios[id].email == email && lista_usuarios[id].password == password) {
            valido = true;
        }
    }
    if (valido) { console.log(`✔️  El usuario se logueó correctamente`); } else { console.log(`❌ Error al loguearse`); }
}

class OrdenCompra {
    constructor(id_orden, usuario, cupon) {
        this.id_orden = id_orden;
        this.usuario_id = usuario;
        this.cupon_id = cupon;
        this.total = 0;
        this.fecha_compra = new Date;
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

const ordenes_compras = {};

function crearOrdenCompra(id_orden, id_usuario, id_cupon) {
    let objetoUsuario = buscarUsuario(id_usuario);
    let objetoCupon = buscarCupon(id_cupon);
    let objetoOrdenCompra = new OrdenCompra(id_orden, objetoUsuario, objetoCupon);
    ordenes_compras[objetoOrdenCompra.id_orden] = objetoOrdenCompra;
    console.log(`✔️  Se creó una órden de compra satisfactoriamente`);
}

function agregarDetalleOrden(id_orden, id_detalle, id_producto, id_usuario) {
    let objetoProducto = buscarProducto(id_producto);
    let objetoCarrito = buscarCarrito(id_usuario);
    let cantidad = 0;

    for(let id in objetoCarrito.ItemCarrito) {
        if (objetoCarrito.ItemCarrito[id].producto_id.id_producto == id_producto) {
            cantidad = objetoCarrito.ItemCarrito[id].cantidad;
            break;
        }
    }

    let objetoDetalleOrden = new DetalleOrden(id_orden, id_detalle, objetoProducto, cantidad, objetoProducto.precio);

    ordenes_compras[id_orden].DetalleOrden.push(objetoDetalleOrden);

    console.log(`Se creó el detalle de la orden N°${id_detalle} dentro de la orden de compra N${id_orden}`);
}

class Envio {
    constructor(id_envio, estado_envio, fecha_envio) {
        this.id_envio = id_envio;
        this.orden_id = OrdenCompra;
        this.estado_envio = estado_envio;
        this.fecha_envio = new Date(fecha_envio);
    }
}

class Pago {
    constructor(id_pago, estado_pago, metodo_pago, fecha_pago) {
        this.id_pago = id_pago;
        this.orden_id = OrdenCompra;
        this.estado_pago = estado_pago;
        this.metodo_pago = metodo_pago;
        this.fecha_pago = new Date(fecha_pago);
    }
}

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
    } else { return false; }
}

function descuentoCupon(cupon_id) {
    if (cupon_id in lista_cupones) { return lista_cupones[cupon_id].descuento };
}

function buscarCupon(cupon_id) {
    for (let id in lista_cupones) {
        if (lista_cupones[id].id_cupon == cupon_id) { return lista_cupones[id] }
    };
}

class DetalleOrden {
    constructor(id_orden, id_detalle, producto, cantidad, precio_unitario) {
        this.id_orden = id_orden;
        this.id_detalle = id_detalle;
        this.producto_id = producto;
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
}

const lista_productos = {};

function crearProducto(objetoProducto) {
    lista_productos[objetoProducto.id_producto] = objetoProducto;
    console.log(`📦 El producto ${objetoProducto.nombre} ha sido creado`);
}

function buscarProducto(id_producto) {
    if (id_producto in lista_productos) { return lista_productos[id_producto] }
    else { return false }
}

function hayStockProducto(id_producto, cantidad) {
    let producto = buscarProducto(id_producto);

    if (producto && producto.stock >= cantidad) { return true; } else { return false; }
}

function restarStockProducto(id_producto, cantidad) {
    lista_productos[id_producto].stock -= cantidad;
}

class ItemCarrito {
    constructor(id_carrito, id_item, objeto_producto, cantidad) {
        this.id_carrito = id_carrito;
        this.id_item = id_item;
        this.producto_id = objeto_producto;
        this.cantidad = cantidad;
    }
}

class Carrito {
    constructor(id_carrito, usuario) {
        this.id_carrito = id_carrito;
        this.usuario = usuario;
        this.ItemCarrito = [];
    }

    agregarProducto(id_producto, cantidad, id_item) {
        const producto = buscarProducto(id_producto);

        if (producto) {
            const hayStock = hayStockProducto(id_producto, cantidad);
            if (hayStock) {
                this.ItemCarrito.push(new ItemCarrito(this.id_carrito, id_item, producto, cantidad));
                restarStockProducto(id_producto, cantidad);
                console.log(`✔️  El item ${producto.nombre} se agregó ${cantidad} vez/veces`)
            } else { console.log(`❌ Stock insuficiente del producto ${producto.nombre}`) }
        } else { console.log(`No existe el producto`) }
    }
}

const lista_carritos = {};

function buscarCarrito(id_usuario) {
    for (let id in lista_carritos) {
        if (lista_carritos[id].usuario.id_usuario == id_usuario) { return lista_carritos[id]; }
    }
}

function crearCarrito(id_carrito, id_usuario) {
    let usuario = buscarUsuario(id_usuario);

    if (usuario) {
        let carrito = new Carrito(id_carrito, usuario);
        lista_carritos[carrito.id_carrito] = carrito;

        console.log(`🛒 El carrito de ${usuario.nombre} se creó correctamente`);
    } else { console.log(`Se produjo un error`); }
}

/* CÓDIGO A EJECUTAR */

console.info(`🟠 CREAMOS UN USUARIO CORPORATIVO`);
registrarUsuario(new Usuario(1 /*id_usuario*/, "Maria Pia Buono" /*nombre*/, "pia@gmail.com"/*mail*/, "password"/*password*/, true/*es_corporativo*/));


console.info(`🟠 CREAMOS EL CUPÓN PARA LOS USUARIOS NORMALES`);
crearCupon(new Cupon(1/*id_cupon*/, "CUPON"/*nombre*/, 5/*descuento*/, "2026/10/12"/*fecha de vencimiento*/, true/*activo*/));

console.info(`🟠 CREAMOS 5 PRODUCTOS`);
crearProducto(new Producto(1 /*id_producto*/, "Cafetera Nescafé 230v Blanca Genio S Blanco" /*nombre*/, 179.999 /*precio*/, 5 /*stock*/));
crearProducto(new Producto(2, "Ventilador Retractil De Techo 4 aspas Color Blanco", 113.149, 50));
crearProducto(new Producto(3, "Perfume Liquid Brun French Avenue 100ml Edp Arabe Veoquiero", 82.081, 100));
crearProducto(new Producto(4, "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro", 257.699, 150));
crearProducto(new Producto(5, "Colchón KL-Eterna Känn Livet 2 Plazas", 308.999, 200));

console.info(`🟠 BUSCAMOS UN PRODUCTO`);
console.table(buscarProducto(4 /*id_producto*/));

console.info(`🟠 CREAMOS EL CARRITO`);
crearCarrito(1 /*id_carrito*/, 1 /*id_usuario*/);

console.info(`🟠 AGREGAMOS ITEMS AL CARRITO`);
lista_carritos[1].agregarProducto(1/*id_producto*/, 2 /*cantidad*/, 1 /*id_item*/);
lista_carritos[1].agregarProducto(1, 40, 2);

console.info(`🟠 VAMOS AL CARRITO`);
console.log(lista_carritos[2]);

console.info(`🟠 HACEMOS LOGIN`);
loguearUsuario("pia@gmail.com", "password");

console.info(`🟠 CREAMOS ORDEN DE COMPRA`);
crearOrdenCompra(1/*id_orden*/, 1/*id_usuario*/, 1/*id_cupon*/);

console.info(`🟠 AGREGAR DETALLES ORDENES A LA ORDEN DE COMPRA`);
console.log(`En proceso de construcción...`)