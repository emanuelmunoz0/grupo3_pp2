// Seed pedagógico separado del index:
// este archivo concentra solo datos iniciales de prueba.
//
// Ventaja:
// - index.js queda enfocado en inicialización de Sequelize
// - el seed se puede mantener/evolucionar sin mezclar responsabilidades

async function getOrCreateCategoria(Categoria, nombre) {
    let categoria = await Categoria.findOne({ where: { nombre } });
    if (!categoria) {
        categoria = await Categoria.create({ nombre });
    }
    return categoria;
}

async function seedDatabase({ Categoria, Producto }) {
    const productsCount = await Producto.count();
    if (productsCount > 0) {
        return;
    }

    const calefaccion = await getOrCreateCategoria(Categoria, 'Calefacción');
    const cocina = await getOrCreateCategoria(Categoria, 'Cocina');

    await Producto.bulkCreate([
        {
            nombre: 'Calefón Orbis 14L Gas Natural',
            precio: 245000,
            stock: 12,
            image: 'https://example.com/images/calefon-orbis-14l.jpg',
            id_categoria: calefaccion.id_categoria,
            validoDesde: '2024-01-01',
            validoHasta: '2099-12-31'
        },
        {
            nombre: 'Calefón Longvie 12L Multigas',
            precio: 198500,
            stock: 8,
            image: 'https://example.com/images/calefon-longvie-12l.jpg',
            id_categoria: calefaccion.id_categoria,
            validoDesde: '2024-01-01',
            validoHasta: '2099-12-31'
        },
        {
            nombre: 'Calefón Rheem 16L Tiro Natural',
            precio: 312000,
            stock: 5,
            image: 'https://example.com/images/calefon-rheem-16l.jpg',
            id_categoria: calefaccion.id_categoria,
            validoDesde: '2024-01-01',
            validoHasta: '2099-12-31'
        },
        {
            nombre: 'Microondas BGH Quick Chef',
            precio: 185000,
            stock: 7,
            image: 'https://example.com/images/microondas-bgh.jpg',
            id_categoria: cocina.id_categoria,
            validoDesde: '2024-01-01',
            validoHasta: '2099-12-31'
        },
        {
            nombre: 'Pava Eléctrica Philips',
            precio: 72000,
            stock: 20,
            image: 'https://example.com/images/pava-philips.jpg',
            id_categoria: cocina.id_categoria,
            validoDesde: '2024-01-01',
            validoHasta: '2099-12-31'
        }
    ]);
}

export default seedDatabase;