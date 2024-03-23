
var Container = document.getElementById('productos');
if (Container) {
    for (var i = 0; i < 14; i++) {
        var elemento = document.createElement("div");
        elemento.className = 'tarjetaProducto2';
        Container.appendChild(elemento);
    }
}


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

                // Agregar la tarjeta al contenedor de productos
                contenedorProductos.appendChild(tarjetaProducto);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de productos:', error);
        });
}, 50); // 2000 milisegundos = 2 segundos


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
