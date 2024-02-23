const minValueDisplay = document.getElementById("min-value-display");
const maxValueDisplay = document.getElementById("max-value-display");
const rangeFill = document.querySelector(".range-fill");
const inputElements = document.querySelectorAll("input");



function updateValueDisplays() {
  minValueDisplay.style.left = `${(inputElements[0].value / 1000) * 100}%`;
  maxValueDisplay.style.left = `${(inputElements[1].value / 1000) * 100}%`;

  minValueDisplay.textContent = `${inputElements[0].value}€`;
  maxValueDisplay.textContent = `${inputElements[1].value}€`;
}

function validateRange() {
  const minPrice = parseInt(inputElements[0].value);
  const maxPrice = parseInt(inputElements[1].value);
  const step = parseInt(inputElements[0].step);


  if (maxPrice < (minPrice + 5) && ((1000-maxPrice) > (minPrice-0))) {
    inputElements[1].value = minPrice + step;
    return;
  }
  if (minPrice > (maxPrice - 5) && ((1000-maxPrice) < (minPrice-0))){
    inputElements[0].value = maxPrice - step;
    return;
  }

  const minPercentage = ((minPrice - 5) / 990) * 100;
  const maxPercentage = ((maxPrice - 5) / 990) * 100;

  rangeFill.style.left = minPercentage + "%";
  rangeFill.style.width = maxPercentage - minPercentage + "%";

  updateValueDisplays();
}


updateValueDisplays();
inputElements.forEach((element) => {
  element.addEventListener("input", () => {
    validateRange();
    updateValueDisplays();
  });
});


validateRange();
