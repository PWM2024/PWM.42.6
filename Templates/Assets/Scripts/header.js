var menu = document.querySelector('#showSidebar');
menu.addEventListener('click', showSidebar)

var close = document.querySelector('#hideSidebar');
close.addEventListener('click', hideSidebar);

var menuRight = document.querySelector('#bocadillo-menu');
menuRight.addEventListener('click', openRightSidebar);

var closeMenuRight = document.querySelector('#hideRightSidebar');
closeMenuRight.addEventListener('click', closeRightSidebar);

var buttonCesta = document.querySelector('#cesta-btn');
buttonCesta.addEventListener('click', closeRightSidebar);

var bocadilloMovil = document.querySelector('.bocadillo-movil');

function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
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
