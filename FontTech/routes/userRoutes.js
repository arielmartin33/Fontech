const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }
})

const uploadFile = multer({ storage});

const validation = [
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

// Todos los usuarios

router.get('/register', userController.register);


// Procesar Registro

router.post('/register', uploadFile.single('image'), validation, userController.processRegister);

// Formulario de logino
router.get('/login', userController.login);


// perfil de Usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;