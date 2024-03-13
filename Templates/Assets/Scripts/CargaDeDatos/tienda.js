document.addEventListener("DOMContentLoaded", function() {
    const productosContainer = document.getElementsByClassName("promociones-container")[0];
    const productosContainer2 = document.getElementsByClassName("novedades-container")[0];
    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(data => {

            data.forEach(producto => {
                if (producto.promocion) { // Limitar a dos iteraciones
                    const productoCard = document.createElement("div");
                    console.log(productoCard)
                    productoCard.classList.add("tarjetaProducto2");

                    productoCard.innerHTML = `
                        <section class="producto-card">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <section class="producto-details">
                                <h1>${producto.nombre}</h1>
                                <h2>${producto.nombre_detallado}</h2>
                                <p>${producto.descripcion}</p>
                                <section class="precio-y-botones">
                                    <button class="eliminar-btn">Añadir</button>
                                </section>
                            </section>
                        </section>
                    `;

                    productosContainer.appendChild(productoCard);
                }
            });

            data.forEach(producto => {
                if (producto.novedad) { // Limitar a dos iteraciones
                    const productoCard = document.createElement("div");
                    console.log(productoCard)
                    productoCard.classList.add("tarjetaProducto2");

                    productoCard.innerHTML = `
                        <section class="producto-card">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <section class="producto-details">
                                <h1>${producto.nombre}</h1>
                                <h2>${producto.nombre_detallado}</h2>
                                <p>${producto.descripcion}</p>
                                <section class="precio-y-botones">
                                    <button class="eliminar-btn">Añadir</button>
                                </section>
                            </section>
                        </section>
                    `;

                    productosContainer2.appendChild(productoCard);
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
});
