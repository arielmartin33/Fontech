const path = require('path');
const {body} = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('Debese ingresar un nombre'),
    body('apellido').notEmpty().withMessage('Debese ingresar un apellido'),
    body('email').notEmpty().withMessage('Debese ingresar una dirección de correo').bail()
    .isEmail().withMessage('Debese ingresar un formato mail valido'),
    body('password').notEmpty().withMessage('Debese ingresar una contraseña'),
    body('image').custom((value, {req }) => {
        let file = req.file;
        let acceptExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file){
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivos permitidas son: ${acceptExtensions.join(', ')}`);
            }
        }

        return true;
    })
]