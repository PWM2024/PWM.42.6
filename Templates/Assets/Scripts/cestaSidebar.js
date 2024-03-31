const overlay = document.getElementById('overlay');
const cart = document.getElementById('cesta-container');

function openCesta(){
    let prueba = document.querySelector('.sidebar');
    prueba.style.transform = 'translateX(-110%)';
    cart.classList.add('open');
    overlay.style.display = 'block'
    setTimeout(()=> {
        overlay.classList.add('active');
    }, 0)
}

function closeCesta(){
    cart.classList.remove('open');
    overlay.classList.remove('active');
    
    setTimeout(()=>{
        overlay.style.display = 'none'
    }, 500)
}
