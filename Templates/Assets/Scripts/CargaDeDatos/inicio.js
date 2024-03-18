fetch('http://localhost:3000/productos')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorProductos = document.getElementById('productos-container');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < 2 && i < data.length; i++) {
            const producto = data[i];
            // Clonar la tarjetaProducto1
            const tarjetaProducto = document.querySelector('.tarjetaProducto1');

            // Llenar la tarjeta clonada con los datos del producto
            tarjetaProducto.querySelector('h1').innerText = producto.nombre;
            tarjetaProducto.querySelector('h2').innerText = producto.nombre_detallado;
            tarjetaProducto.querySelector('p').innerText = producto.descripcion;

            // Agregar la tarjeta al contenedor de productos
            contenedorProductos.appendChild(tarjetaProducto);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


fetch('http://localhost:3000/rutinas')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorRutinas = document.getElementById('rutinas-container');
        console.log(contenedorRutinas)

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < 6 && i < data.length; i++) {
            const rutina = data[i];
            // Clonar la tarjetaProducto1
            const tarjetaRutina = document.querySelector('.tarjetaGeneral');

            // Llenar la tarjeta clonada con los datos del producto
            tarjetaRutina.querySelector('img').innerText = rutina.img;
            tarjetaRutina.querySelector('p').innerText = rutina.nombre;

            // Agregar la tarjeta al contenedor de productos
            contenedorRutinas.appendChild(tarjetaRutina);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });
