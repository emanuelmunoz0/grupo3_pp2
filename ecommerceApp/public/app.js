import { lista_productos, crearProducto, Producto } from "./tp3_pp2.js";


// Agregar los productos del listado en main.js
crearProducto(new Producto(1, "Cafetera Nescafé 230v Blanca Genio S Blanco", 179.999, 5, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTeHC20VN7reUOzJiEHRINl57sjdZEEf1yeaGAoRRqIvTvXYkfCoqcd8a1Lq7rztZI48EpVib6d-XX0nxB_ZJkgP5u4BbI4cJxe2MkwTx0Ad7UVU4yT8kyQN4b-hz0rEQKeTWv8WXuC&usqp=CAc"));
crearProducto(new Producto(2, "Ventilador Retractil De Techo 4 aspas Color Blanco", 113.149, 50, "https://static.hendel.com/media/catalog/product/cache/b866fd8d147dcce474dc8744e477ca66/4/7/47281-min.jpg"));
crearProducto(new Producto(3, "Perfume Liquid Brun French Avenue 100ml Edp Arabe", 82.081, 100, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa-KyJF7luQhelyspiurmcC6Km3XUmYKlY8yZ1Kgtm2keeLBd4t2JpCOaBVoc3qhGcWwXFRSOGG-kkxVxCkOwjsAwBL0e-opeCKk-Kc8AMpRdrDdNKqK2Wt-BcknTTlp3pXzx0iqQ&usqp=CAc"));
crearProducto(new Producto(4, "Samsung Galaxy A16 4g 128gb 4 Gb Ram Negro", 257.699, 150, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTvLAwLAUWKmxIvOkhna6b9oxGfDlTeHTLDZ_pZf6QlFjcSf7ysOKjOt7NxxefKfzMecHXnJ8FqL9LIOT4WIEniqwO6bnToPe4IPjIA_MCgBHhvmsN0R7K5sUMH0PzJ1TNAeC6JhrU&usqp=CAc"));
crearProducto(new Producto(5, "Colchón KL-Eterna Känn Livet 2 Plazas", 308.999, 200, "https://lacardeuse.vtexassets.com/arquivos/ids/1581280-800-auto?v=639034040604200000&width=800&height=auto&aspect=true"));

Object.values(lista_productos).forEach((producto) => {
    const container = document.getElementById("catalogo");
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
    
    const card = document.createElement("div");
    card.classList.add("card", "h-100", "shadow-sm", "border-0", "transition-card");
    card.style.cssText = "transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;";
    
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
        <img src="${producto.img}" class="card-img-top w-100 h-100 object-fit-cover" alt="${producto.nombre}">
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
        <button class="btn btn-primary w-100 btn-sm fw-bold">
          <i class="bi bi-cart-plus"></i> Agregar al carrito
        </button>
      </div>
    `;
    
    colDiv.appendChild(card);
    container.appendChild(colDiv);
})