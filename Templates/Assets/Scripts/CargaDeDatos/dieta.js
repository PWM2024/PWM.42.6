function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



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
            tarjetaDieta.querySelector('#id').innerText = dieta.id;

            // Agregar la tarjeta al contenedor de productos
            contenedorDietas.appendChild(tarjetaDieta);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


fetch('http://localhost:3000/dietas')
    .then(response => response.json())
    .then(data => {
        const lengthData = document.querySelectorAll('.tarjetaGeneral').length;
        const tarjetaDieta = document.querySelectorAll('.tarjetaGeneral');

        for (let i = 0; i < lengthData; i++) {
            tarjetaDieta[i].addEventListener("click", function () {

                var id = tarjetaDieta[i].querySelector('#id').textContent;
                localStorage.setItem('tarjetaDietaID', id);

                fetch(`http://localhost:3000/dietas/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        const detallesTarjeta  = document.querySelector('#detalles-tarjeta');
                        detallesTarjeta.querySelector('p').innerText = data.descripcion;

                    })
            })
        }

    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


fetch('http://localhost:3000/dietas')
    .then(response => response.json())
    .then(data => {
        const filtro = document.querySelector('.filtro');
        async function ejecutarDespuesDeTiempo() {
            await sleep(30); // Espera 2000 milisegundos (2 segundos)
            const opciones = ["Mediterránea", "Rica en Proteínas", "Sin Gluten"];
            const opcion = filtro.querySelectorAll('.check');
            for (let i = 0; i < opciones.length; i++ ){
                opcion[i].querySelector('.text').innerText = opciones[i];
            }
        }

        ejecutarDespuesDeTiempo();
    });