let productos = document.getElementById("containerCards")

for (const producto in productosArray){
    if (!(document.getElementById(`seccion${productosArray[producto].posicion}`))){
        productos.innerHTML += `<div id="seccion${productosArray[producto].posicion}" class="containerCards" style="display: none;"></div>`
    }
    document.getElementById(`seccion${productosArray[producto].posicion}`).innerHTML +=
    `<div class="cardComic">
        <img src="${productosArray[producto].img}">
        <div class="cardInfo">
            <p id="nombreProducto">${productosArray[producto].nombre}</p>
            <p>$<span id="precioProducto">${productosArray[producto].precio}</span></p>
            <button id="id${productosArray[producto].id}" class="botonAgregar">Agregar al Carrito</button>
        </div>
    </div>`

    document.getElementById(`seccion1`).removeAttribute("style")
}

const producto = document.getElementById('containerCards')
producto.addEventListener('click', function(e){
    e.preventDefault()
    if (e.target.classList.contains('botonAgregar')){
        const productoSeleccionado = e.target.parentNode
        const idProducto = productoSeleccionado.childNodes[5].id
        const cant = cantProducto(idProducto)
        
        const objetoProducto = {
            nombre: productoSeleccionado.querySelector('#nombreProducto').textContent,
            precio: parseInt(productoSeleccionado.querySelector('#precioProducto').textContent),
            id: idProducto,
            cantidad: cant
        }

        agregarObjeto(objetoProducto)
    }
})

function agregarObjeto(objetoP){
    if (carritoLocalStorage.length == 0 || objetoP.cantidad == 1){
        carritoLocalStorage.push(objetoP)
        localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage))
        actualizarContador()
    }else{
        for (const elemento of carritoLocalStorage) {
            if (elemento.id == objetoP.id) {
                let indice = carritoLocalStorage.indexOf(elemento)
                carritoLocalStorage.splice(indice, 1, objetoP)
                localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage))
                actualizarContador()
            }
        }
    }
}

function cantProducto(idPro){
    if (carritoLocalStorage.length == 0){
        return 1
    }else{
        for (const elemento of carritoLocalStorage) {
            if (elemento.id == idPro) {
                return elemento.cantidad += 1
            }
        }
        return 1
    }
}