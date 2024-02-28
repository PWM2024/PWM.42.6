function resetPriceFilter() {
    const inputElements = document.querySelectorAll(".filtroPrecio input[type='range']");
    const minValueDisplay = document.getElementById("min-value-display");
    const maxValueDisplay = document.getElementById("max-value-display");
    const rangeFill = document.querySelector(".range-fill");

    inputElements[0].value = 0;
    inputElements[1].value = 1000;

    minValueDisplay.textContent = `${inputElements[0].value}€`;
    maxValueDisplay.textContent = `${inputElements[1].value}€`;

    rangeFill.style.left = "0%";
    rangeFill.style.width = "100%";
}  

var boton = document.getElementsByClassName('limpiar');
boton[0].addEventListener('click', function() {
    document.querySelectorAll('.filtroOpciones input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });

    if (document.querySelectorAll(".filtroPrecio input[type='range']").length !== 0){
        document.querySelector('.min-price').value = 0;
        document.querySelector('.max-price').value = 1000;
        resetPriceFilter();
    }
});