// Función para obtener datos del usuario
function obtenerUsuario() {
    const userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('No se encontró la ID del usuario en el localStorage.');
        return Promise.reject('No se encontró la ID del usuario en el localStorage.');
    }
    return fetch(`http://localhost:3000/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            throw error;
        });
}

// Función para enviar actualizaciones al servidor
function enviarActualizacion(endpoint, data, userId) {
    return fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la actualización');
            }
            return response.json(); // Devolver la respuesta como JSON
        })
        .then(() => {
            location.reload(); // Recargar la página después de completar la actualización
        })
        .catch(error => {
            console.error('Error al enviar la actualización:', error);
        });
}

// Función para manejar eventos de botones de actualización
function manejarActualizacion(botonId, campoId, propiedad, userId, usuario) {
    const boton = document.querySelector(botonId);
    boton.addEventListener("click", function () {
        const valor = document.querySelector(campoId).value;
        if (propiedad === 'password') {
            const antiguaContrasena = document.querySelector('#antiguaContrasena').value;
            const nuevaContrasena = document.querySelector('#nuevaContrasena').value;
            const repetirContrasena = document.querySelector('#repetirContrasena').value;
            if (antiguaContrasena !== usuario.password) {
                console.error('La contraseña antigua no coincide.');
                return;
            }
            if (nuevaContrasena !== repetirContrasena) {
                console.error('Las contraseñas nuevas no coinciden.');
                return;
            }
        }
        const data = {};
        data[propiedad] = valor;
        enviarActualizacion(`/users/${userId}`, data, userId);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.addEventListener("DOMContentLoaded", function() {
    // Obtener usuario y manejar actualizaciones
    obtenerUsuario().then(async usuario => {
        await sleep(50); // Espera 1 segundo
        if (usuario) {

            let tarjetaPromoCode = document.querySelector('.codigoPromocional');

            if(tarjetaPromoCode){
                const PromoCode = tarjetaPromoCode.querySelector('.promo-container');
                PromoCode.querySelector('p').innerText = usuario.promoCode;
            }

            if (usuario.nickname) {
                document.querySelector('.statsForm p').innerText = usuario.nickname;
            } else {
                console.error('El usuario no tiene un nombre válido.');
            }

            if (usuario.kcal) {
                document.querySelector('#kcalConsumidas').innerText = usuario.kcal;
            }

            if (usuario.peso && usuario.altura) {
                const altura = usuario.altura / 100;
                const imc = usuario.peso / (altura * altura);
                document.querySelector('#imc').innerText = imc.toFixed(2);
            }

            // Manejar eventos de actualización después de una pausa de 1 segundo
            await sleep(2000); // Espera 1 segundo
            manejarActualizacion('#nickNameButton', '#nicknameInput', 'nickname', usuario.id, usuario);
            manejarActualizacion('#passwordButton', '#nuevaContrasena', 'password', usuario.id, usuario);
            manejarActualizacion('#KcalButton', '#kcalInput', 'kcal', usuario.id, usuario);
            manejarActualizacion('#pesoButton', '#pesoInput', 'peso', usuario.id, usuario);
            manejarActualizacion('#alturaButton', '#alturaInput', 'altura', usuario.id, usuario);
        }
    });
});


