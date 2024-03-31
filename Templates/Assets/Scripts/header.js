var menu = document.querySelector('#showSidebar');
menu.addEventListener('click', showSidebar)

var close = document.querySelector('#hideSidebar');
close.addEventListener('click', hideSidebar);

function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(0)';
    console.log("si1");
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(-110%)';
}
