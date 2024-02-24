function fetchComponente(url, containerClass) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                //console.warn('Error al cargar el recurso: ' + response.status);
                return; 
            }
            return response.text();
        })
        .then(data => {
            const containers = document.getElementsByClassName(containerClass);
            if (containers.length > 0) {
                Array.from(containers).forEach(container => {
                    container.innerHTML = data;
                });
            } else {
                return;
                //console.warn(`Contenedor con clase '${containerClass}' no encontrado.`);
            }
        })
        .catch(error => console.error(`Error al cargar html -> ${error}`));
}


function fetchComponenteconJSPropio(url, containerClass) {
    fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error('Error al cargar el recurso: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            const containers = document.getElementsByClassName(containerClass);
            if (containers.length > 0) {
                Array.from(containers).forEach(container => {
                    container.innerHTML = html;

                    const scripts = container.getElementsByTagName('script');
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
                });
            } else {
                return;
                //console.error(`No containers found with class '${containerClass}'.`);
            }
        })
        .catch(error => {
            return;
            //console.error(`Error loading HTML: ${error}`);
        });
}

fetchComponente('../Components/tarjetaProducto1.html', 'tarjetaProducto1');
fetchComponente('../Components/tarjetaProducto2.html', 'tarjetaProducto2');
fetchComponente('../Components/tarjetaGeneral.html', 'tarjetaGeneral');
fetchComponente('../Components/tarjetaProductoHistorialCompras.html', 'tarjetaProductoHistorialCompras');
fetchComponente('../Components/alturaForm.html', 'alturaForm');
fetchComponente('../Components/tarjetaProductoListaDeseos.html', 'tarjetaProductoListaDeseos');
fetchComponente('../Components/aplicarCodigoPromocionalForm.html', 'aplicarCodigoPromocional');
fetchComponente('../Components/codigoPromocional.html', 'codigoPromocional');
fetchComponente('../Components/resumenCompra.html', 'resumenCompra');
fetchComponente('../Components/descripcion.html', 'descripcion');
fetchComponente('../Components/botonesCesta.html', 'botonesCesta');
fetchComponente('../Components/formCalculadoraIMC.html', 'formCalculadoraIMC');
fetchComponente('../Components/formCalculadoraKcal.html', 'formCalculadoraKcal');
fetchComponente('../Components/kcalForm.html', 'kcalForm');
fetchComponente('../Components/listaKcal.html', 'listaKcal');
fetchComponente('../Components/miPerfilDetalles.html', 'miPerfilDetalles');
fetchComponente('../Components/ordenarPorDesplegable.html', 'ordenarPorDesplegable');
fetchComponente('../Components/formPassword.html', 'formPassword');
fetchComponente('../Components/pesoForm.html', 'pesoForm');
fetchComponente('../Components/nickNameForm.html', 'nickNameForm');
fetchComponente('../Components/statsForm.html', 'statsForm');
fetchComponente('../Components/footer.html', 'footer');
fetchComponenteconJSPropio('../Components/filtroOpciones.html', 'filtroOpciones');
fetchComponenteconJSPropio('../Components/filtroPrecio.html', 'filtroPrecio');

fetchComponente("../Header/HeaderConLoginAndRegister/headerConLogin.html", 'headerConLogin');
fetchComponente("../Header/HeaderConLoginAndRegister/headerSinBuscarConLogin.html", 'headerSinBuscarConLogin');
fetchComponente('../Header/HeaderSinLoginRegister/headerSinBuscar.html', 'headerSinBuscar');
fetchComponente("../Header/HeaderSinLoginRegister/header.html", 'header');

fetchComponente("../Forms/iniciarSesion.html", 'iniciarSesion');
fetchComponente("../Forms/registrarUsuario.html", 'registrarUsuario');
fetchComponente("../Components/slider.html", 'slider');