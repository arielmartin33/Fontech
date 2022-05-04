const path = require('path');
const {body} = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre').isLength({min:2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('apellido').notEmpty().withMessage('Debes ingresar un apellido').isLength({min:2}).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email').notEmpty().withMessage('Debese ingresar una dirección de correo').bail()
    .isEmail().withMessage('Debese ingresar un formato mail valido'),
    body('password').notEmpty().isLength({min:8}).isLength({max:15}).withMessage('La contraseña debe tener entre 8 y 15 carateres'),
    body('image').custom((value, {req }) => {
        let file = req.file;
        let acceptExtensions = ['.jpg', '.jpeg' ,'.png', '.gif'];
        
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