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

function fetchComponenteconJSPropio(url, containerId){
    fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error('Error al cargar el recurso: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;

            const scripts = document.getElementById(containerId).getElementsByTagName('script');
            for (let script of scripts){
                if (script.src){
                    fetch(script.src)
                    .then(response => response.text())
                    .then(scriptText => eval(scriptText))
                    .catch(error => console.error(`Error loading script: ${error}`));
                }
                else{
                    eval(script.innerText);
                }
            }
        })
        .catch(error => {
            console.error(`Error loading HTML: ${error}`);
        });
}

fetchComponente('/Templates/Components/tarjetaProducto1.html', 'tarjetaProducto1');
fetchComponente('/Templates/Components/tarjetaGeneral.html', 'tarjetaGeneral');
fetchComponente('/Templates/Components/tarjetaProductoHistorialCompras.html', 'tarjetaProductoHistorialCompras');
fetchComponente('/Templates/Components/alturaForm.html', 'alturaForm');
fetchComponente('/Templates/Components/tarjetaProductoListaDeseos.html', 'tarjetaProductoListaDeseos');
fetchComponente('/Templates/Components/aplicarCodigoPromocionalForm.html', 'aplicarCodigoPromocional');
fetchComponente('/Templates/Components/codigoPromocional.html', 'codigoPromocional');
fetchComponente('/Templates/Components/resumenCompra.html', 'resumenCompra');
fetchComponente('/Templates/Components/descripcion.html', 'descripcion');
fetchComponente('/Templates/Components/botonesCesta.html', 'botonesCesta');
fetchComponente('/Templates/Components/formCalculadoraIMC.html', 'formCalculadoraIMC');
fetchComponente('/Templates/Components/formCalculadoraKcal.html', 'formCalculadoraKcal');
fetchComponente('/Templates/Components/kcalForm.html', 'kcalForm');
fetchComponente('/Templates/Components/listaKcal.html', 'listaKcal');
fetchComponente('/Templates/Components/miPerfilDetalles.html', 'miPerfilDetalles');
fetchComponente('/Templates/Components/ordenarPorDesplegable.html', 'ordenarPorDesplegable');
fetchComponente('/Templates/Components/formPassword.html', 'formPassword');
fetchComponente('/Templates/Components/pesoForm.html', 'pesoForm');
fetchComponente('/Templates/Components/nickNameForm.html', 'nickNameForm');
fetchComponente('/Templates/Components/statsForm.html', 'statsForm');
fetchComponente('/Templates/Components/footer.html', 'footer');
fetchComponenteconJSPropio('/Components/filtroOpciones.html', 'filtroOpciones');
fetchComponenteconJSPropio('/Components/filtroPrecio.html', 'filtroPrecio');


fetchComponente("/Templates/Header/HeaderConLoginAndRegister/headerConLogin.html", 'headerConLogin');
fetchComponente("/Templates/Header/HeaderConLoginAndRegister/headerSinBuscarConLogin.html", 'headerSinBuscarConLogin');
fetchComponente('/Templates/Header/HeaderSinLoginRegister/headerSinBuscar.html', 'headerSinBuscar');
fetchComponente("/Templates/Header/HeaderSinLoginRegister/header.html", 'header');

fetchComponente("/Templates/Forms/iniciarSesion.html", 'iniciarSesion');
fetchComponente("/Templates/Forms/registrarUsuario.html", 'registrarUsuario');