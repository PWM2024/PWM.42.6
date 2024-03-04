var boton = document.getElementsByClassName('eliminar-btn');
for (var i = 0; i < boton.length; i++){
    boton[i].addEventListener('click', function() {
        let current = window.location.pathname;
        
        if (current === '/PWM.42.6-main/Templates/Pages/inicioNotLoggedIn.html'){
            window.location.href = '/PWM.42.6-main/Templates/Pages/tiendaNotLoggedIn.html';
        }
        else if (current === '/PWM.42.6-main/Templates/Pages/inicioLoggedIn.html'){
            window.location.href = '/PWM.42.6-main/Templates/Pages/tiendaLoggedIn.html';
        }
    });
}
