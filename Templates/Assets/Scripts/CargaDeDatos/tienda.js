fetch('http://localhost:3000/productos')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        console.log(data);
        const contenedorPromociones = document.getElementById('promociones');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
            const promocion = data[i];
            if(promocion.promocion === true){
                console.log(promocion);
                // Clonar la tarjetaProducto1
                const tarjetaPromocion = document.querySelector('.tarjetaProducto2')

                // Llenar la tarjeta clonada con los datos del producto
                tarjetaPromocion.querySelector('h1').innerText = promocion.nombre;
                tarjetaPromocion.querySelector('h2').innerText = promocion.nombre_detallado;
                tarjetaPromocion.querySelector('p').innerText = promocion.descripcion;
                tarjetaPromocion.querySelector('div').innerText = `${promocion.precio}€`;

                // Agregar la tarjeta al contenedor de productos
                contenedorPromociones.appendChild(tarjetaPromocion);
            }
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


fetch('http://localhost:3000/productos')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        console.log(data);
        const contenedorNovedades = document.getElementById('novedades');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
            const novedad = data[i];
            if(novedad.novedad === true){
                // Clonar la tarjetaProducto1
                const tarjetaNovedad = contenedorNovedades.querySelector('.tarjetaProducto2')

                // Llenar la tarjeta clonada con los datos del producto
                tarjetaNovedad.querySelector('h1').innerText = novedad.nombre;
                tarjetaNovedad.querySelector('h2').innerText = novedad.nombre_detallado;
                tarjetaNovedad.querySelector('p').innerText = novedad.descripcion;
                tarjetaNovedad.querySelector('div').innerText = `${novedad.precio}€`;

                // Agregar la tarjeta al contenedor de productos
                contenedorNovedades.appendChild(tarjetaNovedad);
            }
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });