function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var Container = document.getElementById('productos');
if (Container) {
    for (var i = 0; i < 14; i++) {
        var elemento = document.createElement("div");
        elemento.className = 'tarjetaProducto2';
        Container.appendChild(elemento);
    }
}


document.addEventListener('DOMContentLoaded', function() {
        async function ejecutarDespuesDeTiempo() {
            await sleep(80); // Espera 2000 milisegundos (2 segundos)
            const filtro = document.querySelector('.filtro');
            const opciones = ["Proteína", "Musculación", "Recuperación"];
            const opcion = filtro.querySelectorAll('.check');
            for (let i = 0; i < opciones.length; i++ ){
                opcion[i].querySelector('.text').innerText = opciones[i];
            }
        }

        ejecutarDespuesDeTiempo();
    });

// Introducir un retraso de 2000 milisegundos (2 segundos) antes de ejecutar el segundo fetch
setTimeout(() => {
    fetch('http://localhost:3000/productos')
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            const contenedorProductos = document.getElementById('productos');

            // Iterar sobre los primeros dos elementos del array de productos
            for (let i = 0; i < data.length; i++) {
                const producto = data[i];
                // Clonar la tarjetaProducto1
                const tarjetaProducto = document.querySelector('.tarjetaProducto2');

                // Llenar la tarjeta clonada con los datos del producto
                tarjetaProducto.querySelector('h1').innerText = producto.nombre;
                tarjetaProducto.querySelector('h2').innerText = producto.nombre_detallado;
                tarjetaProducto.querySelector('p').innerText = producto.descripcion;
                tarjetaProducto.querySelector('div').innerText = `${producto.precio}€`;
                tarjetaProducto.querySelector('#id').innerText = producto.id;

                // Agregar la tarjeta al contenedor de productos
                contenedorProductos.appendChild(tarjetaProducto);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de productos:', error);
        });
}, 100); // 2000 milisegundos = 2 segundos



function filtrarComponentes(etiquetas, precio){
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(data => {

            if(etiquetas.length === 0){
                etiquetas = ["Proteína", "Musculación", "Recuperación"];
            }
            const prodcutosFiltrados = [];
            data.forEach(producto => {
                if (etiquetas.includes(producto.etiqueta) && (producto.precio < precio[1] && producto.precio > precio[0])) {
                    prodcutosFiltrados.push(producto.id);
                }
            });

            const tarjetaProducto = document.querySelectorAll('.tarjetaProducto2');
            for (let i = 0; i < tarjetaProducto.length; i++){

                if(!prodcutosFiltrados.includes(tarjetaProducto[i].querySelector('#id').textContent)){
                    tarjetaProducto[i].remove();
                }
            }


        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}


document.addEventListener('DOMContentLoaded', function() {
    const aplicar = document.querySelector('.aplicar');
    const limpiar = document.querySelector('.limpiar');

    aplicar.addEventListener("click", function () {
        const filtro =  document.querySelector('.filtro');
        const checkboxes = filtro.querySelectorAll('.filtro input[type="checkbox"]')
        let etiquetas = [];
        for(let i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                etiquetas.push(filtro.querySelectorAll('.text')[i].textContent);
            }
        }

        const filtroPrecio = document.querySelector('.d-flex');
        const minPrecio = filtroPrecio.querySelector('.input-min').value;
        const maxPrecio = filtroPrecio.querySelector('.input-max').value;

        const precio = [minPrecio, maxPrecio];
        filtrarComponentes(etiquetas, precio);
    })

    limpiar.addEventListener("click", function () {
        location.reload();
    })
});



document.addEventListener('DOMContentLoaded', function() {
    const ordenarMasAlto = document.getElementById('ordenarMasAlto');
    const ordenarMasBajo = document.getElementById('ordenarMasBajo');

    ordenarMasAlto.addEventListener('click', function() {
        ordenarTarjetas(true);
    });

    ordenarMasBajo.addEventListener('click', function() {
        ordenarTarjetas(false);
    });

    function ordenarTarjetas(descendente) {
        const tarjetasProductos = document.querySelectorAll('.tarjetaProducto2');
        const arrayTarjetasProductos = Array.from(tarjetasProductos);

        arrayTarjetasProductos.sort(function(a, b) {
            const precioA = parseFloat(a.querySelector('div').innerText);
            const precioB = parseFloat(b.querySelector('div').innerText);
            return descendente ? precioB - precioA : precioA - precioB;
        });

        const contenedorProductos = document.getElementById('productos');
        contenedorProductos.innerHTML = '';

        arrayTarjetasProductos.forEach(function(tarjeta) {
            contenedorProductos.appendChild(tarjeta);
        });
    }
});
