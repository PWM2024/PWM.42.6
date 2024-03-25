
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


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

function obtenerProducto(id) {
    return fetch(`http://localhost:3000/productos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            return response.json();
        })
        .then(producto => {
            return producto;
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
        });
}



function actualizarTarjetas(productos) {
    const tarjetas = document.querySelectorAll('.tarjetaProductoListaDeseos');

    for( let i = 0; i < tarjetas.length; i++){
        obtenerProducto(productos[i]).then(async producto => {
            tarjetas[i].querySelector('img').innerText = producto.img;
            tarjetas[i].querySelector('.product-name').innerText = producto.nombre;
            tarjetas[i].querySelector('.product-price').innerText = `${producto.precio}€`;
            tarjetas[i].querySelector('#id').innerText = producto.id;
            tarjetas[i].querySelector('img').src = `\\PWM.42.6-main\\Templates\\Source\\Tienda\\${producto.img}`;
        });


    }

}



//LISTA DE DESEOS
var Container = document.getElementById('tarjetas');
if (Container) {
    for (var i = 0; i < 6; i++) {
        var elemento = document.createElement("div");
        elemento.className = 'tarjetaProductoListaDeseos';
        Container.appendChild(elemento);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // Obtener usuario y manejar actualizaciones
    obtenerUsuario().then(async usuario => {
        await sleep(50); // Espera 1 segundo

        const tarjetas = document.querySelectorAll('.tarjetaProductoListaDeseos');

        for(let i = usuario.listaDeseos.length; i < tarjetas.length; i++){
            tarjetas[i].remove();
        }

        actualizarTarjetas(usuario.listaDeseos);
    });
});

document.addEventListener("DOMContentLoaded", async function() {
    const tarjetaListaDeseos = document.querySelectorAll('.tarjetaProductoListaDeseos');
    const userId = localStorage.getItem('userID');

    await sleep(500); // Esperar 1 segundo

    for (const producto of tarjetaListaDeseos) {
        const addButton = producto.querySelector('#add-btn');
        const botonEliminar = producto.querySelector('#delete-btn');
        const productId = producto.querySelector('#id').textContent;
        addButton.addEventListener("click", async function(){

            obtenerUsuario().then(async usuario => {
                const cesta = usuario.cesta || [];
                cesta.push(productId);

                const listaDeseos = usuario.listaDeseos || [];

                const index = listaDeseos.indexOf(productId);
                if (index !== -1) {
                    listaDeseos.splice(index, 1);
                }

                producto.remove();

                return fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cesta, listaDeseos })
                });
            });
        });

        botonEliminar.addEventListener("click", async function(){

            obtenerUsuario().then(async usuario => {

                const listaDeseos = usuario.listaDeseos || [];

                const index = listaDeseos.indexOf(productId);
                if (index !== -1) {
                    listaDeseos.splice(index, 1);
                }

                producto.remove();

                return fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ listaDeseos })
                });
            });
        });
    }
});





