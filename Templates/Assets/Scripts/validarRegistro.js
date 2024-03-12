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

function validarRegistro() {
    var nombre = document.getElementsByName('nombre')[0].value.trim();
    var email = document.getElementsByName('email')[0].value.trim();
    var password = document.getElementsByName('password')[0].value.trim();
    var confirm_password = document.getElementsByName('confirm_password')[0].value.trim();

    if (!nombre || !email || !password || !confirm_password){
        alert("Por favor, complete todos los campos");
        return false;
    }

    // Verificar si el correo ya está registrado
    var storedUser = localStorage.getItem(email);
    if (storedUser) {
        storedUser = JSON.parse(storedUser);
        if (storedUser.email === email) {
            alert('Este correo electrónico ya está registrado.');
            return false;
        }
    }

    if (password !== confirm_password) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Guardar los datos del usuario
    var newUser = {
        nombre: nombre,
        email: email,
        password: password
    };
    localStorage.setItem(newUser.email, JSON.stringify(newUser));

    // Si todo está bien, permite el envío del formulario
    return true;
}
