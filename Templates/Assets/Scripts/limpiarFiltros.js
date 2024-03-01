function resetPriceFilter() {
    const inputElements = document.querySelectorAll(".range-input input[type='range']");
    const minValueDisplay = document.querySelector(".price-input .input-min");
    const maxValueDisplay = document.querySelector(".price-input .input-max");
    const rangeFill = document.querySelector(".slid3r .progress");


    const minDefaultValue = 0;
    const maxDefaultValue = 100;
    inputElements[0].value = minDefaultValue;
    inputElements[1].value = maxDefaultValue;
    minValueDisplay.value = minDefaultValue;
    maxValueDisplay.value = maxDefaultValue;


    const rangeWidth = inputElements[0].offsetWidth;
    const minPos = (minDefaultValue - inputElements[0].min) / (inputElements[0].max - inputElements[0].min);
    const maxPos = (maxDefaultValue - inputElements[1].min) / (inputElements[1].max - inputElements[1].min);
    const progressWidth = maxPos * rangeWidth - minPos * rangeWidth;
    rangeFill.style.left = minPos * rangeWidth + "px";
    rangeFill.style.width = progressWidth + "px";
}


var boton = document.getElementsByClassName('limpiar');
boton[0].addEventListener('click', function() {
    document.querySelectorAll('.filtroOpciones input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });


    if (document.querySelector(".slid3r")) {
        resetPriceFilter();
    }
});
