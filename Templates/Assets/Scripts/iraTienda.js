var boton = document.getElementsByClassName('eliminar-btn');
for (var i = 0; i < boton.length; i++){
    boton[i].addEventListener('click', function() {
        let current = window.location.pathname;
        
        if (current === '/Templates/Pages/inicioNotLoggedIn.html'){
            window.location.href = '/Templates/Pages/tiendaNotLoggedIn.html';
        }
        else if (current === '/Templates/Pages/inicioLoggedIn.html'){
            window.location.href = '/Templates/Pages/tiendaLoggedIn.html';
        }
    });
}
