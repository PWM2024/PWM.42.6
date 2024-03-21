document.addEventListener("DOMContentLoaded", function() {
    var contenedorEstrella = document.getElementsByClassName("contenedor-estrella");

    for (var i=0; i<contenedorEstrella.length; i++){
        var iconoEstrella = document.createElement("i");
        iconoEstrella.classList.add("fas", "fa-star");
        iconoEstrella.id = "icono-estrella";

        iconoEstrella.addEventListener("click", function() {
            this.classList.toggle("clicked");
        });

        contenedorEstrella[i].appendChild(iconoEstrella);
    }

});
