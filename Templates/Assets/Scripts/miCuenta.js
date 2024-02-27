var seleccion = document.getElementsByClassName('account');
seleccion[0].addEventListener('change', function() {
    if (seleccion[0].value === 'opcion1'){
        window.location.href = "/Templates/Pages/perfilMisDatos.html";
    }
    else if (seleccion[0].value === 'opcion2'){
        window.location.href = "/Templates/Pages/cesta.html";
    }
    else if (seleccion[0].value === 'opcion3'){
        window.location.href = "/Templates/Pages/inicioNotLoggedIn.html";
    }
});
