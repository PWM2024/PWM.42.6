function validarInicioSesion(){
    var email = document.getElementsByName('email')[0].value.trim();
    var password = document.getElementsByName('password')[0].value.trim();

    var storedUser = localStorage.getItem(email);
    if (storedUser){
        storedUser = JSON.parse(storedUser);
        if (storedUser.password === password){
            alert("Sesión iniciada correctamente");
            return true;
        }
        else{
            alert("Contraseña incorrectos");
            return false;
        }
    }
    else{
        alert("No existe el usuario");
        return false;
    }
}