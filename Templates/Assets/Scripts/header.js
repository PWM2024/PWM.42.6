var menu = document.querySelector('#showSidebar');
menu.addEventListener('click', showSidebar)

var close = document.querySelector('#hideSidebar');
close.addEventListener('click', hideSidebar);

var menuRight = document.querySelector('#bocadillo-menu');
if (menuRight){
    menuRight.addEventListener('click', openRightSidebar);
}

var closeMenuRight = document.querySelector('#hideRightSidebar');
if (closeMenuRight){
    closeMenuRight.addEventListener('click', closeRightSidebar);
}

var buttonCesta = document.querySelector('#cesta-btn');
if (buttonCesta){
    buttonCesta.addEventListener('click', closeRightSidebarAndButton);
}

var closeCesta = document.querySelector('#cesta-cerrar');
if (closeCesta){
    closeCesta.addEventListener('click', showButton);
}

var bocadilloMovil = document.querySelector('.bocadillo-movil');


function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(0)';
    bocadilloMovil.style.zIndex = '0';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(-110%)';
    bocadilloMovil.style.zIndex = '9999';
}

function openRightSidebar(){
    let rightSidebar = document.querySelector('#right-sidebar-container');
    rightSidebar.style.display = 'block';
    bocadilloMovil.style.zIndex = '0';
}

function closeRightSidebar(){
    let rightSidebar = document.querySelector('#right-sidebar-container');
    rightSidebar.style.display = 'none';
    bocadilloMovil.style.zIndex = '9999';
}

function closeRightSidebarAndButton(){
    let rightSidebar = document.querySelector('#right-sidebar-container');
    rightSidebar.style.display = 'none';
    bocadilloMovil.style.zIndex = '0';
}

function showButton(){
    bocadilloMovil.style.zIndex = '9999';
}
