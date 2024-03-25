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

function generateNumPedido() {
    const characters = '0123456789';
    const length = 12;
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
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

    await sleep(300);
    const container = document.querySelector('.product-list');
    const btnFinalizarCompra = document.querySelector('#boton-finalizarCompra');
    const btnVaciarCesta = document.querySelector('.botones-container button');

    obtenerUsuario().then(async usuario => {
        const cesta = usuario.cesta || [];

        for (let i = 0; i < cesta.length; i++){
            const productoId = cesta[i];

            const producto = await obtenerProducto(productoId);

            const productoCard = document.createElement('section');
            productoCard.classList.add('producto-card-cesta');
            productoCard.setAttribute('id', 'tarjetaCesta');

            productoCard.innerHTML = `

            <img src="../Source/default-img.png" alt="Producto">
            <section class="producto-details">
                <h1>${producto.nombre}</h1>
                <h2>${producto.description}</h2>
                <h1 id="precioProducto">${producto.precio}€</h1>
                <p id="id">${producto.id}<p>
                <section class="producto-unidades">
                    <button class="operar-cantidad" id="operar-cantidad-menos">-</button>
                    <h2 id="cantidad">1</h2>
                    <button class="operar-cantidad" id="operar-cantidad-mas">+</button>
                </section>
            </section>
        `;

            container.appendChild(productoCard);

        }

        btnVaciarCesta.addEventListener('click', function(){
            const cesta = [];
            const userID = localStorage.getItem('userID');
            location.reload();

            return fetch(`http://localhost:3000/users/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cesta })
            });

        })

        btnFinalizarCompra.addEventListener('click', function(){

            var fecha = new Date();


            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            var year = fecha.getFullYear();


            if (dia < 10) {
                dia = '0' + dia;
            }
            if (mes < 10) {
                mes = '0' + mes;
            }


            fecha = dia + '/' + mes + '/' + year;

            const numPedido = generateNumPedido();
            const precio = document.querySelector('#precio-final').innerText.replace('€', '').trim()
            const userID = localStorage.getItem('userID');



            fetch(`http://localhost:3000/compras/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fecha,  numPedido, precio})
            });


            obtenerUsuario().then(async usuario => {
                const compras = usuario.compras || [];
                compras.push(numPedido);
                const cesta = [];
                console.log(cesta)

                return fetch(`http://localhost:3000/users/${userID}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cesta, compras })
                })
                    .then(response => {
                        if (response.ok) {
                            // La solicitud se completó exitosamente, puedes recargar la página aquí
                            location.reload();
                        } else {
                            // Manejar el caso en que la solicitud no se completó exitosamente
                            console.error('Error en la solicitud PATCH:', response.status);
                        }
                    })
                    .catch(error => {
                        console.error('Error al procesar la solicitud:', error);
                    });

            });
            //
        })


    });

});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function calcularCantidad(){
    const container = document.querySelector('.product-list');
    const productoCard = container.querySelectorAll('#tarjetaCesta');
    let totalCantidad = 0; // Variable para acumular las cantidades

    for (let i = 0; i < productoCard.length; i++) {
        const cantidad = parseInt(productoCard[i].querySelector('#cantidad').textContent);
        totalCantidad += cantidad; // Acumulamos la cantidad actual a totalCantidad
    }
    const contador = document.querySelector('.unidades span');
    contador.innerText = totalCantidad;
}


function calcularPrecioFinal(){

    const productoCard = document.querySelectorAll('#tarjetaCesta');
    let totalCantidad = 0; // Variable para acumular las cantidades

    console.log(productoCard);
    for (let i = 0; i < productoCard.length; i++) {

        const precioTexto = productoCard[i].querySelector('#precioProducto').textContent;
        console.log(precioTexto);
        const precioSinEuro = precioTexto.replace('€', '').trim();
        const cantidad =  parseInt(productoCard[i].querySelector('#cantidad').textContent);
        const precioNumerico = parseFloat(precioSinEuro) *cantidad;

        totalCantidad += precioNumerico;
    }

    const descuento = document.querySelector('.descuento span').textContent;
    const descuentoSinPorcentaje = parseInt(descuento.replace('%', '').trim());

    if(descuentoSinPorcentaje > 0){
        totalCantidad = totalCantidad - (totalCantidad*descuentoSinPorcentaje/100);
    }

    document.querySelector('#precio-final').innerText = totalCantidad.toFixed(2) + "€";



}

document.addEventListener("DOMContentLoaded", async function() {
    await sleep(400);
    const botonAplicarCodigoPromocional = document.querySelector(".input-button-container button");
    console.log(botonAplicarCodigoPromocional);

    botonAplicarCodigoPromocional.addEventListener('click', function(){
        fetch(`http://localhost:3000/users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener la lista de usuarios');
                }
                return response.json();
            })
            .then(usuarios => {
                const input = document.querySelector(".input-button-container input").value;
                // Verificar si alguno de los usuarios tiene el código promocional introducido
                const usuarioConPromocion = usuarios.find(usuario => usuario.promoCode === input);
                if (usuarioConPromocion) {
                    const descuento = document.querySelector('.descuento span');
                    descuento.innerText = '10%';
                    calcularPrecioFinal();
                }
            })
            .catch(error => {
                console.error('Error al obtener la lista de usuarios:', error);
            });


    });


});

document.addEventListener("DOMContentLoaded", async function() {
    // Agregamos un retraso de 1 segundo (1000 milisegundos) antes de ejecutar el código dentro de esta función
    await sleep(500);
    calcularCantidad();
    calcularPrecioFinal();

});


document.addEventListener("DOMContentLoaded", async function() {
    // Agregamos un retraso de 1 segundo (1000 milisegundos) antes de ejecutar el código dentro de esta función
    await sleep(500);

    const container = document.querySelector('.product-list');
    const productoCard = container.querySelectorAll('#tarjetaCesta');

    for (let i = 0; i < productoCard.length; i++) {
        const btnMas = productoCard[i].querySelector('#operar-cantidad-mas');
        const btnMenos = productoCard[i].querySelector('#operar-cantidad-menos')
        btnMas.addEventListener("click", function () {
            const cantidadElement = productoCard[i].querySelector('#cantidad');
            let cantidad = parseInt(cantidadElement.textContent);
            cantidad++;
            cantidadElement.textContent = cantidad;
            calcularCantidad();
            calcularPrecioFinal();
        })

        btnMenos.addEventListener("click", function () {
            const cantidadElement = productoCard[i].querySelector('#cantidad');
            const id = productoCard[i].querySelector('#id').textContent;
            let cantidad = parseInt(cantidadElement.textContent);
            const userID = localStorage.getItem('userID');

            if(cantidad === 1){
                obtenerUsuario().then(async usuario => {

                    const cesta = usuario.cesta || [];

                    const index = cesta.indexOf(id);
                    if (index !== -1) {
                        cesta.splice(index, 1);
                    }

                    return fetch(`http://localhost:3000/users/${userID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cesta })
                    });
                });

                productoCard[i].remove();
            }
            cantidad--;
            cantidadElement.textContent = cantidad;
            calcularCantidad();
            calcularPrecioFinal();
        })
    }
});
