var menuPerfilDetalles = document.querySelector('#bocadillo-perfil-detalles');
menuPerfilDetalles.addEventListener('click', openMenuPerfilDetalles)

var quitMenuPerfilDetalles = document.querySelector('#closeMenu');
document.addEventListener('DOMContentLoaded', function (){
    quitMenuPerfilDetalles.addEventListener('click', closeMenuPerfilDetalles);
});

var bocadilloMenu = document.querySelector('.bocadillo-movil');

function openMenuPerfilDetalles(){
    let menu = document.querySelector('.miPerfilDetalles-movil');
    menu.style.display = 'block';
    quitMenuPerfilDetalles.style.display = 'block';
    bocadilloMenu.style.zIndex = '0';
}

function closeMenuPerfilDetalles(){
    let menu = document.querySelector('.miPerfilDetalles-movil');
    menu.style.display = 'none';
    bocadilloMenu.style.zIndex = '9999';
}
