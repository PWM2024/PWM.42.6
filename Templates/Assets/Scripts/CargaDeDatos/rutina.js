function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function cambiarRutina(tarjetaRutina, rutina){
    tarjetaRutina.querySelector('img').innerText = rutina.img;
    tarjetaRutina.querySelector('p').innerText = rutina.nombre;
    tarjetaRutina.querySelector('#id').innerText = rutina.id;
}

function filtrarComponentes(etiquetas){
    console.log(etiquetas);
    fetch('http://localhost:3000/rutinas')
        .then(response => response.json())
        .then(data => {
            const rutinasFiltradas = [];
            data.forEach(rutina => {
                if (rutina.etiqueta && etiquetas.includes(rutina.etiqueta)) {
                    rutinasFiltradas.push(rutina.id);
                }
            });


            const tarjetaRutina = document.querySelectorAll('.tarjetaGeneral');
            for (let i = 0; i < tarjetaRutina.length; i++){
                if(!rutinasFiltradas.includes(tarjetaRutina[i].querySelector('#id').textContent)){
                    tarjetaRutina[i].remove();
                }
            }

            console.log(rutinasFiltradas.length);



        })
        .catch(error => {
            console.error('Error al obtener las rutinas:', error);
        });
}



fetch('http://localhost:3000/rutinas')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorRutinas = document.getElementById('tarjetasRutina-container');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
            const rutina = data[i];

            const tarjetaRutina = document.querySelector('.tarjetaGeneral');
            cambiarRutina(tarjetaRutina, rutina)

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


fetch('http://localhost:3000/rutinas')
    .then(response => response.json())
    .then(data => {
        const boton = document.querySelector('.aplicar');
        const boton2 = document.querySelector('.limpiar');

        boton.addEventListener("click", function () {
            const filtro =  document.querySelector('.filtro');
            const checkboxes = filtro.querySelectorAll('.filtro input[type="checkbox"]')
            let etiquetas = [];
            for(let i = 0; i < checkboxes.length; i++){
                if(checkboxes[i].checked){
                    etiquetas.push(filtro.querySelectorAll('.text')[i].textContent);
                }
            }

            filtrarComponentes(etiquetas);


        })

        boton2.addEventListener("click", function () {
            location.reload();
        })
    });