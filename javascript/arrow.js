class Recorredor{
    constructor(estadoActual, cantElementos){
        this.estadoActual = estadoActual
        this.cantElementos = cantElementos
    }

    siguiente(){
        if (this.estadoActual == this.cantElementos) {
            this.estadoActual = 1
        } else {
            this.estadoActual += 1
        }
        return this.estadoActual
    }

    atras(){
        if (this.estadoActual == 1) {
            this.estadoActual = this.cantElementos
        } else {
            this.estadoActual -= 1
        }
        return this.estadoActual
    }

    actualizar(){
        this.estadoActual = 1
    }
}

let right = document.getElementById('right')
let left = document.getElementById('left')

const recorredor = new Recorredor(1, 5)

left.classList.add('deactivate')

right.addEventListener('click', function(){
    let numRecorredor = recorredor.siguiente()
    left.classList.remove('deactivate')
    document.getElementById(`seccion${numRecorredor}`).removeAttribute("style")
    document.getElementById(`seccion${numRecorredor-1}`).setAttribute('style', "display: none;")
    if (numRecorredor == 5) {
        right.classList.add('deactivate')
    }
})

left.addEventListener('click', function(){
    let numRecorredor = recorredor.atras()
    right.classList.remove('deactivate')
    document.getElementById(`seccion${numRecorredor}`).removeAttribute("style")
    document.getElementById(`seccion${numRecorredor+1}`).setAttribute('style', "display: none;")
    if (numRecorredor == 1) {
        left.classList.add('deactivate')
    }
})