let sliderContainer = document.querySelector(".slider-contenedor");
let sliderItems = document.querySelectorAll(".slider-container");
let slideIndex = 1;
let slideWidth = (sliderItems.length > 0) ? sliderItems[0].clientWidth : 0;
let interval = 3000;

window.addEventListener("resize", function () {
    slideWidth = (sliderItems.length > 0) ? sliderItems[0].clientWidth : 0;
});

setInterval(function () {
    showSlides();
}, interval);

function showSlides() {
    if (sliderItems.length === 0) {
        return; // Evitar errores si no hay elementos con la clase
    }

    sliderContainer.style.transform = "translate(" + (-slideWidth * slideIndex) + "px)";
    sliderContainer.style.transition = "transform .8s";
    slideIndex++;

    if (slideIndex == sliderItems.length) {
        setTimeout(function () {
            sliderContainer.style.transform = "translate(0px)";
            sliderContainer.style.transition = "transform 0s";
            slideIndex = 1;
        }, 1500);
    }
}
