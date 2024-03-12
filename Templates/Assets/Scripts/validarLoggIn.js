window.onload = function() {
    var storedUser = localStorage.getItem("email");
    if (!storedUser) {
        var defaultUser = {
            nombre: 'admin',
            email: 'admin@administracionFitByte.es',
            password: '1234'
        };
        localStorage.setItem(defaultUser.email, JSON.stringify(defaultUser));
    }
};

function validarLoggIn(){
    var email = document.getElementsByName('email')[0].value.trim();
    var password = document.getElementsByName('password')[0].value.trim();

    if (!email || !password){
        alert("Por favor, complete todos los campos");
        return false;
    }

    var storedUser = localStorage.getItem(email);
    if (storedUser){
        storedUser = JSON.parse(storedUser);
        if (storedUser.password === password){
            alert("Sesión iniciada correctamente");
            window.location.href = '/PWM.42.6-main/Templates/Pages/inicioLoggedIn.html';
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