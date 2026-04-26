# 🛒 Sistema de Compras en JavaScript

Este proyecto es una simulación completa de un sistema de e-commerce desarrollado en JavaScript puro. Incluye usuarios, productos, carritos, cupones, órdenes de compra, pagos y envío.

---

# 📦 1. ¿Qué hace este sistema?

Permite simular todo el flujo de una compra online:

* 👤 Registro y login de usuarios
* 🛍️ Creación de productos
* 🧺 Gestión de carritos
* 🎟️ Aplicación de cupones o descuentos corporativos
* 🧾 Generación de órdenes de compra
* 💳 Procesamiento de pagos
* 🚚 Simulación de envío
* 📧 Envío de confirmación por mail

---

# 🧠 2. Arquitectura general

El sistema está dividido en 8 bloques principales:

## 🧱 1. Entidades (Clases)

Representan los objetos principales del sistema:

* Usuario 👤
* Producto 📦
* Carrito 🛒
* ItemCarrito 🧺
* OrdenCompra 🧾
* DetalleOrden 📋
* Cupon 🎟️
* Pago 💳
* Envio 🚚

---

## 🗄️ 2. Base de datos en memoria

El sistema no usa base de datos real, sino objetos en memoria:

* lista_usuarios 👤
* lista_productos 📦
* lista_carritos 🛒
* lista_cupones 🎟️
* sesion 🔐

---

## 👤 3. Gestión de usuarios

Funciones principales:

* registrarUsuario() ➕
* loguearUsuario() 🔐
* cerrarSesion() 🚪
* estaLogueado() ✔️

También permite distinguir usuarios corporativos.

---

## 🎟️ 4. Cupones

Permiten aplicar descuentos:

* crearCupon() ➕
* validarCupon() ✔️
* descuentoCupon() 💰

⏳ Los cupones tienen fecha de vencimiento.

---

## 📦 5. Productos

Gestión del catálogo:

* crearProducto() ➕
* buscarProducto() 🔍
* control de stock 📉

---

## 🧺 6. Carrito de compras

Permite agregar productos antes de comprar:

* crearCarrito() 🛒
* agregarProducto() ➕
* control de stock automático

---

## 🧾 7. Checkout (proceso de compra)

Flujo completo de compra:

1. 🔎 verificarStockCarrito()
2. 🔐 verificarSesion()
3. 🚚 ingresarDatosEnvio()
4. 🧾 generarOrden()
5. 💳 seleccionarMetodoPago()
6. 💰 procesarPago()
7. 🧾 emitirTicket()
8. 📧 enviarMailConfirmacion()

---

## 💳 8. Pagos y envío

* Pago: estado (Pendiente / Aprobado / Rechazado)
* Envio: estado del pedido (Pendiente / En preparación)

---

# 🎯 3. Reglas de negocio

✔️ Usuario corporativo → 10% de descuento

🎟️ Usuario normal → usa cupón si es válido

❌ Si el pago falla → la compra se cancela

---

# 🧪 4. Simulación incluida

El sistema incluye 2 escenarios:

## 🟠 Compra 1 — Usuario corporativo

* Maria Pia 👩‍💼
* 10% de descuento automático
* Pago aprobado ✔️

## 🟠 Compra 2 — Usuario normal

* Ludmila 👩
* Cupón 5% 🎟️
* Pago rechazado ❌

---

# ⚙️ 5. Conceptos clave que usa el proyecto

* Programación orientada a objetos 🧱
* Manejo de estado en memoria 🧠
* Flujo de checkout paso a paso 🔄
* Simulación de sistema real de e-commerce 🛍️

---

# 🚀 6. Objetivo del proyecto

Este proyecto busca simular un sistema real de compras online para practicar:

* lógica de negocio
* estructuras de datos
* flujo de sistemas reales
* programación modular

---

# 🧩 7. Posibles mejoras

* Persistencia con base de datos real 🗄️
* API REST 🌐
* Frontend con React ⚛️
* Autenticación con JWT 🔐

---

# 🧠 Autores

Maria Pia Buono, Ludmila Sánchez Rufanacht, Graciela Vargas Guerrieri, Rodrigo Emanuel Gomez Muñoz y Diego Romero.