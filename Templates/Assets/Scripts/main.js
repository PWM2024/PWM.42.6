function fetchComponente(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el recurso: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Error al cargar html -> ${error}`));
}


//Header Sin Login ni Register
fetchComponente('../Header/HeaderSinLoginRegister/headerSinBuscar.html', 'header');

//Página Cesta
fetchComponente('../../Components/tarjetaProducto1.html', 'tarjetaProducto1');
fetchComponente('../../Components/aplicarCodigoPromocionalForm.html', 'aplicarCodigoPromocional');
fetchComponente('../../Components/resumenCompra.html', 'resumenCompra');
fetchComponente('../../Components/botonesCesta.html', 'botonesCesta');

//Página Calculadora IMC
fetchComponente('../Components/formCalculadoraIMC.html', 'formCalculadoraIMC');

//Página Calculadora Kcal
fetchComponente('../Components/formCalculadoraKcal.html', 'formCalculadoraKcal');

//Footer
fetchComponente('../Components/footer.html', 'footer');