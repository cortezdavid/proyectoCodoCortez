if (localStorage.length == 0) {
    localStorage.setItem('carrito', JSON.stringify([]))
}

let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))
actualizarContador()

const mostrarCarrito = document.getElementById("botonCarrito")
const contenedorCarrito = document.getElementById("carrito")
const confiarmarCompra = document.getElementById("confimarCompra")

mostrarCarrito.addEventListener("click", function(){
    limpiarCarrito()
    mostrarTabla()
    eliminarProducto()
})

confiarmarCompra.addEventListener("click", function(){
    limpiarCarrito()
    const finalizarCompra = document.createElement("h2")
    finalizarCompra.innerHTML = "Gracias por su compra"
    contenedorCarrito.appendChild(finalizarCompra)
    carritoLocalStorage.splice([0])
    localStorage.setItem('carrito', JSON.stringify([]));
    actualizarContador()
    confiarmarCompra.style.display = 'none'
})

function actualizarContador(){
    let contadorProductos = document.getElementById("contadorProductos")
    contadorProductos.textContent = carritoLocalStorage.length
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    confiarmarCompra.style.display = 'inline-block'
}

function mostrarTabla(){
    if (carritoLocalStorage.length == 0){
        confiarmarCompra.style.display = 'none';
        const carritoVacio = document.createElement("h2")
        carritoVacio.innerHTML = "carrito vacio"
        contenedorCarrito.appendChild(carritoVacio)
    } else {
        const thead = document.createElement("thead")
        thead.innerHTML = `<tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th></th>
                           </tr>`
        contenedorCarrito.appendChild(thead)

        let tbody = document.createElement("tbody")
        let precioTotal = 0
        for (productoLocal of carritoLocalStorage){
            tbody.innerHTML += `<tr>
                                    <th>${productoLocal.nombre}</th>
                                    <th class="textCenter">${productoLocal.cantidad}</th>
                                    <th class="textCenter">$${productoLocal.precio}</th>
                                    <th><button id="remove${productoLocal.id}" class="botonEliminar"><i class="fas fa-times cruz"></i></button></th>  
                                </tr>`
            precioTotal += (productoLocal.cantidad * productoLocal.precio)
        }
        contenedorCarrito.appendChild(tbody)

        let tfoot = document.createElement("tfoot")
        tfoot.innerHTML += `<tr>
                                <th>PRECIO TOTAL</th>
                                <th></th>
                                <th class="textCenter">$${precioTotal}</th>
                                <th></th>
                            </tr>`
        contenedorCarrito.appendChild(tfoot)
        
    }
}

function eliminarProducto(){
    let divs = document.getElementsByClassName("botonEliminar");
    for (var i=0; i< divs.length; i++) {
        divs[i].addEventListener("click",function() {
            for (productos of carritoLocalStorage){
                if (productos.id == this.id.substr(6)){
                    let indice = carritoLocalStorage.indexOf(productos)
                    carritoLocalStorage.splice(indice, 1)
                    localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage))
                    limpiarCarrito()
                    mostrarTabla()
                    eliminarProducto()
                    actualizarContador() 
                }
            }
        })
    }
}
