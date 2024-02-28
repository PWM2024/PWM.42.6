document.addEventListener('DOMContentLoaded', function() {

    const fatherContainer =document.getElementById('rutinas-container');

    const container = document.getElementById('left-btn');
    const scrollLeftButton = document.createElement('button');
    scrollLeftButton.innerHTML = '&#9664;';
    scrollLeftButton.classList.add('scroll-button', 'scroll-left');
    container.appendChild(scrollLeftButton);

    const container2 = document.getElementById('right-btn');
    const scrollRightButton = document.createElement('button');
    scrollRightButton.innerHTML = '&#9654;';
    scrollRightButton.classList.add('scroll-button', 'scroll-right');
    container2.appendChild(scrollRightButton);


    scrollLeftButton.addEventListener('click', () => {
        fatherContainer.scrollLeft -= 300; 
    });

    scrollRightButton.addEventListener('click', () => {
        fatherContainer.scrollLeft += 300; 
    });
});
