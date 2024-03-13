document.addEventListener("DOMContentLoaded", function() {
    const productosContainer = document.getElementsByClassName("productos-container")[0];
    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let contador = 0; // Variable contador para llevar el seguimiento de cuántas tarjetas se han creado

            data.forEach(producto => {
                if (contador < 2) { // Limitar a dos iteraciones
                    const productoCard = document.createElement("div");
                    console.log(productoCard)
                    productoCard.classList.add("tarjetaProducto1");

                    productoCard.innerHTML = `
                        <section class="producto-card">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <section class="producto-details">
                                <h1>${producto.nombre}</h1>
                                <h2>${producto.nombre_detallado}</h2>
                                <p>${producto.descripcion}</p>
                                <section class="precio-y-botones">
                                    <button class="eliminar-btn">Ir A Tienda</button>
                                </section>
                            </section>
                        </section>
                    `;

                    productosContainer.appendChild(productoCard);
                    contador++; // Incrementar el contador después de crear una tarjeta de producto
                } else {
                    // Si ya se han creado dos tarjetas, salir del bucle forEach
                    return;
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
});
