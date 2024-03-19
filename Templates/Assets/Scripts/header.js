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
}

function closeRightSidebar(){
    let rightSidebar = document.querySelector('#right-sidebar-container');
    rightSidebar.style.display = 'none';
}
