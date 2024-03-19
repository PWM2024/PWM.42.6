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
            console.log(usuario)
            let tarjetaDetalles = document.querySelector('.statsForm');
            let tarjetaPromoCode = document.querySelector('.codigoPromocional');
            console.log(tarjetaPromoCode);

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