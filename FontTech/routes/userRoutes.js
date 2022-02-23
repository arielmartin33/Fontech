const express = require('express');
const router = express.Router();
//controllers

const userController = require('../controllers/userController');

//middlewares

const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadAvatar = require('../middlewares/avatarMiddleware');

// Todos los usuarios

router.get('/register', guestMiddleware, userController.register);


// Procesar Registro

router.post('/register', uploadAvatar.single('image'), validations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

//Proceso de login

router.post('/login', userController.loginProcess);

//logout
router.get('/logout', userController.logout);


// perfil de Usuario
router.get('/profile/', authMiddleware, userController.profile);

module.exports = router;