function obtenerUsuario() {
    const userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('No se encontró la ID del usuario en el localStorage.');
        return Promise.reject('No se encontró la ID del usuario en el localStorage.');
    }
    return fetch(`http://localhost:3000/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            throw error;
        });
}

function obtenerProducto(productId) {
    return fetch(`http://localhost:3000/productos/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
            throw error;
        });
}


document.addEventListener("DOMContentLoaded", async function() {
    const container = document.querySelector('.product-list');
    console.log(container);
    const btn = document.querySelector('#boton-finalizarCompra');
    obtenerUsuario().then(async usuario => {
        const cesta = usuario.cesta || [];

        for (let i = 0; i < cesta.length; i++){
            const productoId = cesta[i];
            console.log(productoId);

            const producto = await obtenerProducto(productoId);

            const productoCard = document.createElement('section');
            productoCard.classList.add('producto-card');

            productoCard.innerHTML = `

            <img src="../Source/default-img.png" alt="Producto">
            <section class="producto-details">
                <h1>${producto.nombre}</h1>
                <h2>${producto.description}</h2>
                <h1>${producto.precio}€</h1>
                <p id="id">${producto.id}<p>
                <section class="producto-unidades">
                    <button class="operar-cantidad">-</button>
                    <h2>1</h2>
                    <button class="operar-cantidad">+</button>
                </section>
            </section>
        `;

            container.appendChild(productoCard);

        }


    });

    /*btn.addEventListener("click", async function(){

        console.log("Prueba");
    });*/
});