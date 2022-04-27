const formulario = document.getElementById('inputs-container');
const inputs = document.querySelectorAll('#inputs-container input');
const textarea = document.querySelectorAll('#inputs-container textarea');


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
    descripcion: /^[a-zA-ZÀ-ÿ\s]{20,120}$/, // Letras y espacios, pueden llevar acentos.
    
}

const campos = {
	nombre: false,
	descripcion: false,
    
}


const validarLogin = (e) => {
	switch (e.target.name) {
		case "name":
            validarCampo(expresiones.nombre, e.target, 'name');

        break;
		case "descripcion":
            validarCampo(expresiones.descripcion, e.target, 'descripcion');
		

        break;
		
		
	}
}

const validarCampo = (expresion, input, campo) =>{
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formularioGrupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formularioGrupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} .formularioInputError`).classList.remove('formularioInputError-activo');
        campos [campo] = true;
    }
    else {
        document.getElementById(`grupo__${campo}`).classList.add("formularioGrupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formularioGrupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formularioInputError`).classList.add('formularioInputError-activo');
        campos [campo] = false
    }
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarLogin);
	input.addEventListener('blur', validarLogin);
});