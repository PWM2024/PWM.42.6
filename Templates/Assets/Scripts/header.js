var menu = document.querySelector('#showSidebar');
menu.addEventListener('click', showSidebar)

var close = document.querySelector('#hideSidebar');
close.addEventListener('click', hideSidebar);

var buttonCesta = document.querySelector('#cesta-btn-movil');
if (buttonCesta){
    buttonCesta.addEventListener('click', hideSidebar);
}

function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(0)';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(-110%)';
}
