document.addEventListener("DOMContentLoaded", function() {
    const productosContainer = document.getElementsByClassName("productos-container")[0];
    const productosContainer2 = document.getElementsByClassName("rutinas-container")[0];
    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let contador = 0;

            data.forEach(producto => {
                if (contador < 2) {
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
                    contador++;
                } else {

                    return;
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });


    fetch("http://localhost:3000/rutinas")
        .then(response => response.json())
        .then(data => {
            let contador = 0;

            data.forEach(rutina => {
                if (contador < 6) {
                    const productoCard = document.createElement("div");
                    console.log(productoCard)
                    productoCard.classList.add("tarjetaGeneral");

                    productoCard.innerHTML = `
                        <article class="tarjeta">
                            <a href="#" onclick="fetchAndInsertHTML('../Components/descripcion.html', 'detalles-tarjeta')">
                                <img src="${rutina.imagen}" alt="${rutina.nombre}">
                                <p>${rutina.nombre}</p>
                            </a>
                        </article>
                    `;


                    productosContainer2.appendChild(productoCard);
                    contador++;
                } else{
                    return;
                }
            });

        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
});
