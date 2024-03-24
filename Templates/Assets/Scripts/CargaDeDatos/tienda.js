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


fetch('http://localhost:3000/productos')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorPromociones = document.getElementById('promociones');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
            const promocion = data[i];
            if(promocion.promocion === true){
                // Clonar la tarjetaProducto1
                const tarjetaPromocion = document.querySelector('.tarjetaProducto2')

                // Llenar la tarjeta clonada con los datos del producto
                tarjetaPromocion.querySelector('h1').innerText = promocion.nombre;
                tarjetaPromocion.querySelector('h2').innerText = promocion.nombre_detallado;
                tarjetaPromocion.querySelector('p').innerText = promocion.descripcion;
                tarjetaPromocion.querySelector('div').innerText = `${promocion.precio}€`;
                tarjetaPromocion.querySelector('#id').innerText = promocion.id;

                // Agregar la tarjeta al contenedor de productos
                contenedorPromociones.appendChild(tarjetaPromocion);
            }
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


fetch('http://localhost:3000/productos')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        const contenedorNovedades = document.getElementById('novedades');

        // Iterar sobre los primeros dos elementos del array de productos
        for (let i = 0; i < data.length; i++) {
            const novedad = data[i];
            if(novedad.novedad === true){
                // Clonar la tarjetaProducto1
                const tarjetaNovedad = contenedorNovedades.querySelector('.tarjetaProducto2')

                // Llenar la tarjeta clonada con los datos del producto
                tarjetaNovedad.querySelector('h1').innerText = novedad.nombre;
                tarjetaNovedad.querySelector('h2').innerText = novedad.nombre_detallado;
                tarjetaNovedad.querySelector('p').innerText = novedad.descripcion;
                tarjetaNovedad.querySelector('div').innerText = `${novedad.precio}€`;
                tarjetaNovedad.querySelector('#id').innerText = novedad.id;

                // Agregar la tarjeta al contenedor de productos
                contenedorNovedades.appendChild(tarjetaNovedad);
            }
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });



fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        const tarjetaProducto = document.querySelectorAll('.tarjetaProducto2');
        const userId = localStorage.getItem('userID');

        if (!userId) {
            console.error('No se encontró la ID del usuario en el localStorage.');
            return;
        }

        tarjetaProducto.forEach(producto => {
            const botonEliminar = producto.querySelector('.eliminar-btn');
            const listaDeseos = producto.querySelector('.contenedor-estrella');
            const productId = producto.querySelector('#id').textContent;

            botonEliminar.addEventListener("click", () => actualizarUsuario('cesta', productId));
            listaDeseos.addEventListener("click", () => actualizarUsuario('listaDeseos', productId));
        });

        function actualizarUsuario(propiedad, productId) {
            obtenerUsuarioPorId(userId)
                .then(usuario => {
                    usuario[propiedad] = usuario[propiedad] || [];

                    // Comprobación si el producto ya está en la lista
                    if (usuario[propiedad].includes(productId)) {
                        console.log('El producto ya está en la lista.');
                        return; // No hace nada si el producto ya está en la lista
                    }

                    usuario[propiedad].push(productId);
                    console.log(usuario[propiedad]);
                    return fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ [propiedad]: usuario[propiedad] })
                    });
                })
                .then(response => {
                    if (!response || !response.ok) {
                        throw new Error('La solicitud de actualización del usuario falló.');
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar el usuario:', error);
                });
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de productos:', error);
    });


