const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,14}$/
}

const formulario = document.getElementById('form')

formulario.addEventListener('submit', function(e){
    e.preventDefault()
    const inputs = document.getElementsByTagName('input')
    let noError = 0
    for (let i = 0; i < inputs.length; i++) {
        let alert = inputs[i].parentElement.querySelector('p')
        alert.removeAttribute('style')
        inputs[i].classList.remove('error')
        if (!inputs[i].value) {
            alert.innerText = 'campo vacio'
            error(inputs[i])
        }else if (inputs[i].name == 'nombre' && !expresiones.nombre.test(inputs[i].value)) {
            alert.innerText = 'el nombre no puede contener números o simbolos'
            error(inputs[i])
        }else if (inputs[i].name == 'email' && !expresiones.correo.test(inputs[i].value)) {
            alert.innerText = 'el correo es invalido'
            error(inputs[i])
        }else if (inputs[i].name == 'telefono' && !expresiones.telefono.test(inputs[i].value)) {
            alert.innerText = 'solo puede contener números y como minimo 8 números'
            error(inputs[i])
        }else{
            noError += 1
        }
    }
    if (noError == 3) {
        window.alert("Formulario enviado")
    }

})

function error(nodoInput){
    nodoInput.className = 'error'
    nodoInput.parentNode.querySelector('p').style.visibility = 'visible'
}