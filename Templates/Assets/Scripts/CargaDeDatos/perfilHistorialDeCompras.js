document.addEventListener("DOMContentLoaded", function() {

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

    // Obtener usuario y manejar actualizaciones
    obtenerUsuario().then(async usuario => {
        await sleep(50); // Espera 1 segundo

        const tarjetas = document.querySelectorAll('.purchase-info');
        console.log(tarjetas);

        for (let i = usuario.compras.length; i < tarjetas.length; i++){
            tarjetas[i].remove();
        }

        for (let i = 0; i < tarjetas.length; i++) {
            const numPedido = usuario.compras[i]; // Obtener el número de pedido de usuario.compras
            fetch(`http://localhost:3000/compras?numPedido=${numPedido}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener la compra');
                    }
                    return response.json();
                })
                .then(data => {

                    tarjetas[i].querySelector('#empresa').innerText = 'FitByte';
                    tarjetas[i].querySelector('#fecha').innerText = data[0].fecha;
                    tarjetas[i].querySelector('#numPedido').innerText = data[0].numPedido;
                    tarjetas[i].querySelector('#precio').innerText = data[0].precio + '€'; // Suponiendo que solo necesitas el primer resultado
                })
                .catch(error => {
                    console.error('Error al obtener la compra:', error);
                });
        }


    });


});