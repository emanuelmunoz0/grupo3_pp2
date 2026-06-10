// import {
//   lista_productos,
//   crearProducto,
//   Producto,
//   crearCarrito,
//   generarOrden,
//   DetalleOrden
// } from "./tp3_pp2.js";

// // Agregar los productos del listado en main.js
// crearProducto(
//   new Producto(
//     1,
//     "Cafetera Nescafé 230v Blanca Genio S Blanco",
//     179.999,
//     5,
//     "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTeHC20VN7reUOzJiEHRINl57sjdZEEf1yeaGAoRRqIvTvXYkfCoqcd8a1Lq7rztZI48EpVib6d-XX0nxB_ZJkgP5u4BbI4cJxe2MkwTx0Ad7UVU4yT8kyQN4b-hz0rEQKeTWv8WXuC&usqp=CAc",
//   ),
// );
// crearProducto(
//   new Producto(
//     2,
//     "Ventilador Retractil De Techo 4 aspas Color Blanco",
//     113.149,
//     50,
//     "https://static.hendel.com/media/catalog/product/cache/b866fd8d147dcce474dc8744e477ca66/4/7/47281-min.jpg",
//   ),
// );
// crearProducto(
//   new Producto(
//     3,
//     "Perfume Liquid Brun French Avenue 100ml Edp Arabe",
//     82.081,
//     100,
//     "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa-KyJF7luQhelyspiurmcC6Km3XUmYKlY8yZ1Kgtm2keeLBd4t2JpCOaBVoc3qhGcWwXFRSOGG-kkxVxCkOwjsAwBL0e-opeCKk-Kc8AMpRdrDdNKqK2Wt-BcknTTlp3pXzx0iqQ&usqp=CAc",
//   ),
// );
// crearProducto(
//   new Producto(
//     4,
//     "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro",
//     257.699,
//     150,
//     "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTvLAwLAUWKmxIvOkhna6b9oxGfDlTeHTLDZ_pZf6QlFjcSf7ysOKjOt7NxxefKfzMecHXnJ8FqL9LIOT4WIEniqwO6bnToPe4IPjIA_MCgBHhvmsN0R7K5sUMH0PzJ1TNAeC6JhrU&usqp=CAc",
//   ),
// );
// crearProducto(
//   new Producto(
//     5,
//     "Colchón KL-Eterna Känn Livet 2 Plazas",
//     308.999,
//     200,
//     "https://lacardeuse.vtexassets.com/arquivos/ids/1581280-800-auto?v=639034040604200000&width=800&height=auto&aspect=true",
//   ),
// );

// let carrito = crearCarrito(1, 2); // Crear un carrito para el usuario con ID 2 (Ludmila)
// let orden = generarOrden(carrito.id_carrito, 0);

// async function addToCart(id) {
//   try {
//     const respuesta = await fetch('/api/productos/' + id); // Esperamos a la red
//     const producto = await respuesta.json();

//     console.log("Producto agregado al carrito:", producto);
//     carrito.agregarProducto(producto.id_producto, 1, Date.now());

//     const detalle = new DetalleOrden(
//         1,
//         carrito.ItemCarrito.length,
//         1,
//         producto.precio,
//       );
//       detalle.producto_id = producto.id_producto;
//       orden.agregarDetalle(detalle);

//   } catch (error) {
//     console.error("Error al cargar el producto:", error);
//   }

// }

async function crearCardsProducto(categoryId = "") {
  const container = document.getElementById("catalogo");
  container.innerHTML = "";

  try {
    const endpoint = new URL("/api/productos", window.location.origin);

    if (categoryId) {
      endpoint.searchParams.set("id_categoria", categoryId);
    }

    const respuesta = await fetch(`${endpoint.pathname}${endpoint.search}`); // Esperamos a la red
    const productos = await respuesta.json(); // Esperamos a que se convierta a JSON

    if (!productos.length) {
      container.innerHTML = `
        <div class="col-12">
          <div class="alert alert-light border text-center mb-0">
            No hay productos para la categoría seleccionada.
          </div>
        </div>
      `;
      return;
    }

    productos.forEach((producto) => {
      const productoId = producto.id_producto || producto.id;
      const colDiv = document.createElement("div");
      colDiv.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

      const card = document.createElement("div");
      card.classList.add(
        "card",
        "h-100",
        "shadow-sm",
        "border-0",
        "transition-card",
      );
      card.style.cssText =
        "transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;";

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.classList.add("shadow");
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.classList.remove("shadow");
      });

      card.innerHTML = `
        <div class="position-relative overflow-hidden" style="height: 250px; background: #f8f9fa;">
          <img src="${producto.image}" class="card-img-top w-100 h-100 object-fit-cover" alt="${producto.nombre}">
          ${producto.stock < 20 ? '<span class="badge bg-warning position-absolute top-0 end-0 m-2">Últimas unidades</span>' : '<span class="badge bg-success position-absolute top-0 end-0 m-2">En stock</span>'}
        </div>
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-bold text-truncate" title="${producto.nombre}">${producto.nombre}</h6>
          <p class="card-text text-muted small mb-3" style="flex-grow: 1; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
            Stock disponible: ${producto.stock} unidades
          </p>
          <div class="mb-3">
            <div class="d-flex align-items-center justify-content-between">
              <span class="h5 mb-0 text-primary fw-bold">$${producto.precio.toLocaleString()}</span>
              <span class="badge bg-danger">10% OFF</span>
            </div>
          </div>
        </div>
        <div class="card-footer bg-white border-top-0">
          <button class="btn btn-primary w-100 btn-sm fw-bold addToCartBtn" ${producto.stock === 0 ? "disabled" : ""} id="${productoId}">
            <i class="bi bi-cart-plus"></i> ${producto.stock > 0 ? "Agregar al carrito" : "Agotado"}
          </button>
        </div>
      `;

      colDiv.appendChild(card);
      container.appendChild(colDiv);
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

function updateCartDisplay(carrito) {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  cartItemsContainer.textContent = carrito.ItemCarrito.length;

  const total = orden.calcularTotal();
  cartTotalContainer.textContent = total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

async function cargarCategorias() {
  const categoryFilter = document.getElementById("category-filter");
  try {
    const respuesta = await fetch("/api/categorias"); // Esperamos a la red
    const categorias = await respuesta.json(); // Esperamos a que se convierta a JSON
    categoryFilter.innerHTML =
      '<option value="">Todas las categorías</option>' +
      categorias
        .map(
          (category) =>
            `<option value="${category.id_categoria}">${category.nombre}</option>`,
        )
        .join("");
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
}

async function loginUser(email, password) {
  const respuesta = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data.error || "No se pudo iniciar sesión");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  await renderUI();
}

function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.getElementById("catalogo").innerHTML = "";
  renderUI();
}

function getStoredUser() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
}

async function renderUI() {
  const user = getStoredUser();
  const loginSection = document.getElementById("login-section");
  const catalogSection = document.getElementById("catalog-section");
  const cartSummary = document.getElementById("cart-summary");
  const sessionStatus = document.getElementById("session-status");
  const logoutButton = document.getElementById("logout-button");
  const adminActionsPanel = document.getElementById("admin-actions-panel");

  if (!user) {
    loginSection.classList.remove("d-none");
    catalogSection.classList.add("d-none");
    cartSummary.classList.add("d-none");
    logoutButton.classList.add("d-none");
    adminActionsPanel.classList.add("d-none");
    sessionStatus.textContent = "Modo invitado";
    return;
  }

  loginSection.classList.add("d-none");
  catalogSection.classList.remove("d-none");
  cartSummary.classList.remove("d-none");
  logoutButton.classList.remove("d-none");
  sessionStatus.textContent = `Conectado como ${user.nombre} (${user.role})`;

  if (user.role === "admin") {
    adminActionsPanel.classList.remove("d-none");
  } else {
    adminActionsPanel.classList.add("d-none");
  }

  await crearCardsProducto();
  await cargarCategorias();
}

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const loginMessage = document.getElementById("login-message");

    loginMessage.textContent = "";

    try {
      await loginUser(email, password);
      event.target.reset();
    } catch (error) {
      loginMessage.textContent = error.message;
    }
  });

document.getElementById("logout-button").addEventListener("click", logoutUser);

document
  .getElementById("reload-products")
  .addEventListener("click", async () => {
    const selectedCategory = document.getElementById("category-filter").value;
    await crearCardsProducto(selectedCategory);
    await cargarCategorias();
    document.getElementById("category-filter").value = selectedCategory;
  });

document
  .getElementById("category-filter")
  .addEventListener("change", async (event) => {
    await crearCardsProducto(event.target.value);
  });

document.getElementById("admin-action-button").addEventListener("click", () => {
  alert("Funcionalidad en desarrollo");
});

renderUI();
