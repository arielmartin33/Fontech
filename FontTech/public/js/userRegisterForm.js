const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a/-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,15}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    image: /(.jpg|.jpeg|.png|.gif)$/i
}

const campos = {
	nombre: false,
	apellido: false,
	password: false,
	email: false,
    image: false,
	
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');       
        break;
		case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
		case "password":
            validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();

        break;
		case "password2":
			validarPassword2();

		break;
		case "email":
            validarCampo(expresiones.email, e.target, 'email');

        break;
		case "image":
			validarCampo(expresiones.image, e.target, 'image');
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

 const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formularioGrupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formularioGrupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formularioInputError`).classList.add('formularioInputError-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formularioGrupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formularioGrupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formularioInputError`).classList.remove('formularioInputError-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

 formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(campos.nombre && campos.apellido && campos.password && campos.email){

		formulario.reset();

		document.getElementById('formularioMensajeExito').classList.add('formularioMensajeExito-activo');
		setTimeout(() => {
			document.getElementById('formularioMensajeExito').classList.remove('formularioMensajeExito-activo');
        }, 5000);


		document.querySelectorAll('.formularioGrupo-correcto').forEach((icono) => {
			icono.classList.remove('formularioGrupo-correcto');
		});
	} else {
		document.getElementById('formularioMensaje').classList.add('formularioMensaje-activo');
	}

}) 






