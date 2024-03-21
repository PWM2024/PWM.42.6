function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
            tarjetaRutina.querySelector('#id').innerText = rutina.id;

            // Agregar la tarjeta al contenedor de productos
            contenedorRutinas.appendChild(tarjetaRutina);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


fetch('http://localhost:3000/rutinas')
    .then(response => response.json())
    .then(data => {
        const lengthData = document.querySelectorAll('.tarjetaGeneral').length;
        const tarjetaRutina = document.querySelectorAll('.tarjetaGeneral');

        for (let i = 0; i < lengthData; i++) {
            tarjetaRutina[i].addEventListener("click", function () {

                var id = tarjetaRutina[i].querySelector('#id').textContent;
                localStorage.setItem('tarjetaDietaID', id);

                fetch(`http://localhost:3000/rutinas/${id}`)
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


fetch('http://localhost:3000/rutinas')
    .then(response => response.json())
    .then(data => {
        const filtro = document.querySelector('.filtro');
        async function ejecutarDespuesDeTiempo() {
            await sleep(50); // Espera 2000 milisegundos (2 segundos)
            const opciones = ["En Casa", "Fuerza", "Flexibilidad"];
            const opcion = filtro.querySelectorAll('.check');
            for (let i = 0; i < opciones.length; i++ ){
                opcion[i].querySelector('.text').innerText = opciones[i];
            }
        }

        ejecutarDespuesDeTiempo();
    });
