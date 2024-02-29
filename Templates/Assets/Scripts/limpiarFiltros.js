function resetPriceFilter() {
    const inputElements = document.querySelectorAll(".slid3r input[type='range']");
    const minValueDisplay = document.querySelector(".price-input .input-min");
    const maxValueDisplay = document.querySelector(".price-input .input-max");
    const rangeFill = document.querySelector(".slid3r .progress");

    inputElements[0].value = 2500;
    inputElements[1].value = 7500;

    minValueDisplay.value = 2500;
    maxValueDisplay.value = 7500;

    rangeFill.style.left = "25%";
    rangeFill.style.width = "50%";
}

var boton = document.getElementsByClassName('limpiar');
boton[0].addEventListener('click', function() {
    document.querySelectorAll('.filtroOpciones input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });

    console.log(`${document.querySelectorAll(".slid3r input[type='range']").length}`);
    if (document.querySelectorAll(".slid3r input[type='range']").length !== 0){
        document.querySelector('.slid3r .input-min').value = 2500;
        document.querySelector('.slid3r .input-max').value = 7500;
        resetPriceFilter();
    }
});