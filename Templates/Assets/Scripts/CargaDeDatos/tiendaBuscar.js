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