
document.addEventListener('click', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error de red: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length > 0) {
                        window.location.href = '/PWM.42.6-main/Templates/Pages/inicioLoggedIn.html';
                        localStorage.setItem('userID', data[0].id);
                    } else {
                        showPopup('Credenciales inválidos.');
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
