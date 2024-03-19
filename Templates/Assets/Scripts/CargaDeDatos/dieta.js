fetch('http://localhost:3000/dietas')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorDietas = document.getElementById('tarjetasDieta-container');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
            const dieta = data[i];
            // Clonar la tarjetaProducto1
            const tarjetaDieta = document.querySelector('.tarjetaGeneral');

            // Llenar la tarjeta clonada con los datos del producto
            tarjetaDieta.querySelector('img').innerText = dieta.img;
            tarjetaDieta.querySelector('p').innerText = dieta.nombre;

            // Agregar la tarjeta al contenedor de productos
            contenedorDietas.appendChild(tarjetaDieta);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });