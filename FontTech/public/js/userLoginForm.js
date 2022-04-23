const formulario = document.getElementById('inputs-container');
const inputs = document.querySelectorAll('#inputs-container input');

const expresiones = {
	password: /^.{8,15}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
   
}

const campos = {
	password: false,
	email: false,
   
	
}

const validarLogin = (e) => {
	switch (e.target.name) {
		case "email":
            validarCampo(expresiones.email, e.target, 'email');

        break;
		case "password":
            validarCampo(expresiones.password, e.target, 'password');
		

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