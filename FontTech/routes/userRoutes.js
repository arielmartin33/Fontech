const express = require('express');
const router = express.Router();
//controllers

const userController = require('../controllers/userController');

//middlewares

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');


// Todos los usuarios

router.get('/register', userController.register);


// Procesar Registro

router.post('/register', uploadFile.single('image'), validations, userController.processRegister);

// Formulario de login
router.get('/login', userController.login);

//Proceso de login

router.post('/login', userController.loginProcess);


// perfil de Usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;