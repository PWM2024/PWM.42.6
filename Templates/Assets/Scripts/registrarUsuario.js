let formSubmitted = false;

document.addEventListener('click', function () {
    const registerForm = document.getElementById('registerForm');

    function generatePromoCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 8;
        let code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    }

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

            // Inicializar campos adicionales
            const additionalData = {
                peso: "",
                altura: "",
                imc: "",
                kcal: "",
                cesta: [],
                listaDeseos: [],
                compras: []
            };

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
                        showPopup('Usuario registrado.');
                    } else {
                        if(!formSubmitted){
                            formSubmitted = true;
                            const promoCode = generatePromoCode();
                            fetch(`http://localhost:3000/users?email=${email}&promoCode=${promoCode}`) // Comprueba si el código promocional ya existe
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Error de red: ' + response.statusText);
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    if (data.length > 0) {
                                        // Si ya existe un usuario con este código, generamos uno nuevo recursivamente
                                        generatePromoCode();
                                    } else {
                                        fetch('http://localhost:3000/users', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ nickname, email, password, promoCode, ...additionalData })
                                        })
                                            .then(response => {
                                                if (!response.ok) {
                                                    throw new Error('Error de red: ' + response.statusText);
                                                }
                                                return response.json();
                                            })
                                            .then(data => {
                                                window.location.href = '/PWM.42.6-main/Templates/Pages/inicioLoggedIn.html';
                                                localStorage.setItem('userID', data.id);
                                            })
                                            .catch(error => {
                                                console.error('Error:', error);
                                            });
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }

                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});

function showPopup(message) {
    const popup = document.getElementById('messagePopup');
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(function () {
        popup.style.display = 'none';
    }, 4500);

}

