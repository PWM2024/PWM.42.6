var formulario = document.querySelector(".formulario-imc");
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    let imc = peso / (altura / 100) ** 2;

    let mostrarIMC = document.querySelector(".imcInfo .imcDetalles label");
    mostrarIMC.textContent = `Tu IMC es: ${imc.toFixed(2)}`;
});
