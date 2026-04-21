// Este archivo importa los datos de main.js y muestra el proceso en el HTML
import("../tp3_pp2.js").then((mod) => {
  // Simulación manual de los datos de compra, ya que main.js solo imprime en consola
  // En un proyecto real, los datos vendrían de una API o almacenamiento compartido

  // Compra aprobada (ejemplo)
  const compraAprobada = {
    orden: {
      id: 1,
      cliente: "Maria Pia Buono",
      fecha: "21/4/2026",
      productos: [
        {
          nombre: "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro",
          cantidad: 1,
          precio: 257699,
        },
        {
          nombre: "Colchón KL-Eterna Känn Livet 2 Plazas",
          cantidad: 1,
          precio: 308999,
        },
      ],
      subtotal: 566698,
      descuento: "-10% (Corporativo)",
      total: 510028,
      metodo: "Tarjeta de crédito",
      estadoPago: "Aprobado",
      estadoEnvio: "En preparación",
    },
  };

  // Compra rechazada (ejemplo)
  const compraRechazada = {
    orden: {
      id: 2,
      cliente: "Ludmila Sánchez Rufanacht",
      fecha: "21/4/2026",
      productos: [
        {
          nombre: "Cafetera Nescafé 230v Blanca Genio S Blanco",
          cantidad: 2,
          precio: 179999,
        },
        {
          nombre: "Perfume Liquid Brun French Avenue 100ml Edp Arabe",
          cantidad: 1,
          precio: 82081,
        },
      ],
      subtotal: 442079,
      descuento: "-5% (Cupón CUPON)",
      total: 419975,
      metodo: "Transferencia bancaria",
      estadoPago: "Rechazado",
      estadoEnvio: "Cancelada",
    },
  };

  function renderTicket(orden, aprobado = true) {
    let html = `<div class="ticket">`;
    html += `<div><span class="label">Orden N°:</span> <span class="value">${orden.id}</span></div>`;
    html += `<div><span class="label">Fecha:</span> <span class="value">${orden.fecha}</span></div>`;
    html += `<div><span class="label">Cliente:</span> <span class="value">${orden.cliente}</span></div>`;
    html += `<div class="productos">`;
    html += `<div class="label">Productos:</div>`;
    orden.productos.forEach((p) => {
      html += `<div class="producto"><span class="producto-nombre">${p.nombre}</span> <span class="producto-cantidad">x${p.cantidad}</span> <span class="producto-precio">$${(p.precio * p.cantidad).toLocaleString("es-AR")}</span></div>`;
    });
    html += `</div>`;
    html += `<div><span class="label">Subtotal:</span> <span class="value">$${orden.subtotal.toLocaleString("es-AR")}</span></div>`;
    html += `<div class="descuento">Descuento: ${orden.descuento}</div>`;
    html += `<div class="total">TOTAL: $${orden.total.toLocaleString("es-AR")}</div>`;
    html += `<div class="metodo">Método de pago: ${orden.metodo}</div>`;
    html += `<div class="estado">Estado pago: ${orden.estadoPago}</div>`;
    if (!aprobado) {
      html += `<div class="cancelada">Compra cancelada. El pago fue rechazado.<br>¿Desea reintentar el pago? (s/n)<br>Redirigiendo a seleccionar método de pago...</div>`;
    } else {
      html += `<div class="estado">Estado envío: ${orden.estadoEnvio}</div>`;
    }
    html += `</div>`;
    return html;
  }

  document.getElementById("aprobada-content").innerHTML = renderTicket(
    compraAprobada.orden,
    true,
  );
  document.getElementById("rechazada-content").innerHTML = renderTicket(
    compraRechazada.orden,
    false,
  );
});
