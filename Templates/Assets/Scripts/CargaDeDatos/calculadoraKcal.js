function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cargarOpciones() {
    const selecter = document.querySelector('.alimentos');
    fetch('http://localhost:3000/alimentos')
        .then(response => response.json())
        .then(data => {
            // Iterar sobre los datos del JSON y agregar opciones al select
            data.forEach(alimento => {
                const option = document.createElement('option');
                option.value = alimento.id;
                option.text = alimento.nombre;
                selecter.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los alimentos:', error));
}




document.addEventListener("DOMContentLoaded", async function(){
    await sleep(100); // Espera 100 milisegundos antes de continuar
    cargarOpciones();



    const addBtn = document.querySelector('#addBtn');
    addBtn.addEventListener('click', function(){
        const formCalculador = document.querySelector('.formCalculadoraKcal');
        const input = formCalculador.querySelector('input').value;
        const alimentoID = document.querySelector('.alimentos').value;
        const list = document.querySelector('#listaAlimentos');

        if(input > 0){
            fetch(`http://localhost:3000/alimentos/${alimentoID}`)
                .then(response => response.json())
                .then(alimento => {

                    const listItem = document.createElement('li');
                    listItem.classList.add("alimentoEnLista");

                    const nombreSpan = document.createElement('span');
                    nombreSpan.textContent = alimento.nombre; //
                    listItem.appendChild(nombreSpan);

                    const caloriasSpan = document.createElement('span');
                    caloriasSpan.classList.add("valorCalorico");
                    caloriasSpan.textContent = input*alimento.kcal_por_cada_100gr/100 + 'Kcal';
                    listItem.appendChild(caloriasSpan);

                    const eliminarButton = document.createElement('button');
                    eliminarButton.textContent = 'Eliminar';
                    eliminarButton.addEventListener('click', function() {
                        listItem.remove();
                    });
                    listItem.appendChild(eliminarButton);

                    list.appendChild(listItem);
                })
                .catch(error => console.error('Error al cargar los alimentos:', error));

        }


        const kcalTotales = document.querySelector('.kcalTotales');

        kcalTotales.addEventListener('click', function (){

            const alimentos = document.querySelectorAll('.alimentoEnLista');

            var cantidadCalorias = 0;

            for (let i = 0; i < alimentos.length; i++){
                const valorCaloricoText = alimentos[i].querySelector('.valorCalorico').textContent;
                const calorias = parseInt(valorCaloricoText.replace('Kcal', '').trim());
                cantidadCalorias += calorias;
            }

            if(cantidadCalorias>0){
                const popUp = document.getElementById("popup")
                popUp.style.display = "block";

                popUp.querySelector('p').innerText = 'Total de calorías: ' + cantidadCalorias + ' Kcal';

                const closeBtn = document.querySelector(".close")
                closeBtn.addEventListener('click', function (){
                    popUp.style.display = "none";
                })
            }


            list.innerHTML = '';

        });

    })


})
