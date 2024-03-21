function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function obtenerUsuarioPorId(idUsuario) {
    return fetch(`http://localhost:3000/users/${idUsuario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }

            return response.json();
        })
        .then(usuario => usuario)
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}

// Uso de la función para obtener el usuario con la ID almacenada en el localStorage
const userId = localStorage.getItem('userID');
if (userId) {
    obtenerUsuarioPorId(userId)
        .then(usuario => {
            let tarjetaDetalles = document.querySelector('.statsForm');
            let tarjetaPromoCode = document.querySelector('.codigoPromocional');

            if(tarjetaPromoCode){
                const PromoCode = tarjetaPromoCode.querySelector('.promo-container');
                console.log(PromoCode);
                console.log(PromoCode.querySelector('p'));
                PromoCode.querySelector('p').innerText = usuario.promoCode;
            }

            if (usuario && usuario.nickname) {
                tarjetaDetalles.querySelector('p').innerText = usuario.nickname;
            } else {
                console.error('El usuario no tiene un nombre válido.');
            }
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        });
} else {
    console.error('No se encontró la ID del usuario en el localStorage.');
}





fetch(`http://localhost:3000/users/`)
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const boton = document.querySelector('#nickNameButton');

        boton.addEventListener("click", function () {
            const nuevoNickName = document.querySelector('#nicknameInput').value;
            let nickname = nuevoNickName;
            fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname })
            })
            location.reload();
        })

    })
    .catch(error => {
        console.error('Error al obtener los datos de usuarios:', error);
    });
