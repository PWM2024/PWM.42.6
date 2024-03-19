fetch('http://localhost:3000/rutinas')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorRutinas = document.getElementById('tarjetasRutina-container');
        console.log(contenedorRutinas)

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
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
