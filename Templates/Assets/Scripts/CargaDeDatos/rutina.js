document.addEventListener("DOMContentLoaded", function() {
    const productosContainer = document.getElementsByClassName("tarjetas")[0];
    fetch("http://localhost:3000/rutinas")
        .then(response => response.json())
        .then(data => {

            data.forEach(rutina => {
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


                productosContainer.appendChild(productoCard);

            });

        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
});
