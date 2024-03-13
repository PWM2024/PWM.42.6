document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nickname = document.getElementById('nickname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const verifyPassword = document.getElementById('verifyPassword').value;

            if (password !== verifyPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            fetch(`http://localhost:3000/users?email=${email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error de red: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.length);
                    if (data.length > 0) {
                        alert('El usuario ya está registrado.');
                    } else {
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ nickname, email, password })
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Error de red: ' + response.statusText);
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('Respuesta del servidor:', data);

                                window.location.href = '/PWM.42.6-main/Templates/Pages/inicioLoggedIn.html';
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});
