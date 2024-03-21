function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function filtrarComponentes(etiquetas){
    console.log(etiquetas);
    fetch('http://localhost:3000/dietas')
        .then(response => response.json())
        .then(data => {
            const dietasFiltradas = [];
            data.forEach(dieta => {
                if (dieta.etiqueta && etiquetas.includes(dieta.etiqueta)) {
                    dietasFiltradas.push(dieta.id);
                }
            });


            const tarjetaDieta = document.querySelectorAll('.tarjetaGeneral');
            for (let i = 0; i < tarjetaDieta.length; i++){
                if(!dietasFiltradas.includes(tarjetaDieta[i].querySelector('#id').textContent)){
                    tarjetaDieta[i].remove();
                }
            }

            console.log(tarjetaDieta.length);



        })
        .catch(error => {
            console.error('Error al obtener las rutinas:', error);
        });
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
            await sleep(50); // Espera 2000 milisegundos (2 segundos)
            const opciones = ["Mediterránea", "Rica en Proteínas", "Sin Gluten"];
            const opcion = filtro.querySelectorAll('.check');
            for (let i = 0; i < opciones.length; i++ ){
                opcion[i].querySelector('.text').innerText = opciones[i];
            }
        }

        ejecutarDespuesDeTiempo();
    });

fetch('http://localhost:3000/dietas')
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