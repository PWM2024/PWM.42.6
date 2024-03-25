function fetchComponente(url, containerClass) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
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
            }
        })
        .catch(error => console.error(`Error al cargar html -> ${error}`));
}


function fetchComponenteconJSPropio(url, containerClass) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
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
                    for (let script of scripts) {
                        if (script.src) {
                            fetch(script.src)
                                .then(response => response.text())
                                .then(scriptText => eval(scriptText))
                                .catch(error => console.error(`Error loading script: ${error}`));
                        } else {
                            eval(script.innerText);
                        }
                    }
                });
            } else {
                return;
            }
        })
        .catch(error => {
            return;
        });
}

function fetchComponenteConId(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                return;
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            } else {
                console.warn(`Contenedor con id '${containerId}' no encontrado.`);
                return;
            }
        })
        .catch(error => console.error(`Error al cargar html -> ${error}`));
}

function fetchAndInsertHTML(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el recurso: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            } else {
                console.error(`Contenedor con ID '${containerId}' no encontrado.`);
            }
        })
        .catch(error => {
            console.error(`Error al cargar/inserir HTML: ${error}`);
        });
}


function generarComponente(numComponentes, contenedorId, nombreElemento) {
    var Container = document.getElementById(contenedorId);

    if (Container) {
        for (var i = 0; i < numComponentes; i++) {
            var elemento = document.createElement("div");
            elemento.className = nombreElemento;
            Container.appendChild(elemento);
        }
    }
}

function clearElementContent(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        element.innerHTML = '';
    } else {
        console.error(`Elemento con ID '${elementId}' no encontrado.`);
    }
}

function mostrarBlur() {
    console.log("Blur añadido");
    document.getElementById("fondoDesenfocado").style.display = "block";
}

function esconderBlur() {
    console.log("Blur quitado");
    document.getElementById("fondoDesenfocado").style.display = "none";
}




fetchComponenteconJSPropio('../Components/tarjetaProducto1.html', 'tarjetaProducto1');
fetchComponente('../Components/tarjetaProducto2.html', 'tarjetaProducto2');
fetchComponente('../Components/tarjetaProducto3.html', 'tarjetaProducto3');
fetchComponente('../Components/tarjetaGeneral.html', 'tarjetaGeneral');

fetchComponente('../Components/cesta.html', 'cestaHeader');
fetchComponente('../Components/tarjetaProductoHistorialCompras.html', 'tarjetaProductoHistorialCompras');
fetchComponente('../Components/tarjetaProductoListaDeseos.html', 'tarjetaProductoListaDeseos');
fetchComponente('../Components/codigoPromocional.html', 'codigoPromocional');
fetchComponente('../Components/resumenCompra.html', 'resumenCompra');
fetchComponente('../Components/descripcion.html', 'descripcion');
fetchComponente('../Components/formCalculadoraIMC.html', 'formCalculadoraIMC');
fetchComponente('../Components/formCalculadoraKcal.html', 'formCalculadoraKcal');
fetchComponente('../Components/listaKcal.html', 'listaKcal');
fetchComponente('../Components/miPerfilDetalles.html', 'miPerfilDetalles');
fetchComponente('../Components/ordenarPorDesplegable.html', 'ordenarPor');
fetchComponente('../Components/perfilForm.html', 'perfilForm');
fetchComponente('../Components/statsForm.html', 'statsForm');
fetchComponente('../Components/footer.html', 'footer');
fetchComponenteconJSPropio('../Components/filtroOpciones.html', 'filtroOpciones');
fetchComponenteconJSPropio('../Components/filtroPrecio.html', 'filtroPrecio');

fetchComponenteconJSPropio("../Header/HeaderConLoginAndRegister/headerConLogin.html", 'headerConLogin');
fetchComponenteconJSPropio("../Header/HeaderConLoginAndRegister/headerSinBuscarConLogin.html", 'headerSinBuscarConLogin');
fetchComponenteconJSPropio('../Header/HeaderSinLoginRegister/headerSinBuscar.html', 'headerSinBuscar');
fetchComponenteconJSPropio("../Header/HeaderSinLoginRegister/header.html", 'header');

fetchComponenteconJSPropio("../Forms/iniciarSesion.html", 'iniciarSesion');
fetchComponenteconJSPropio("../Forms/registrarUsuario.html", 'registrarUsuario');
fetchComponenteconJSPropio("../Components/slider.html", 'slider');
fetchComponente("../Components/imcDetalles.html", 'imcDetalles');
