const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const validateUserForm = [
    body('nombre').notEmpty().withMessage('Debe ingresar un nombre'),
    body('apellido').notEmpty().withMessage('Debe ingresar un apellido'),
    body('email').isEmail().withMessage('Debe ingresar un email válido'),
    body('password').trim().isLength({ min: 6}).withMessage('El password debe contener al menos 6 caracteres')
];
// Todos los usuarios

router.get('/', userController.index);

// Creacion de usuarios

router.get('/registro', userController.register);

// Almaccenamiento de usuario

router.post('/', userController.store);

// Detalle de Usuario
router.get('/', userController.detail)

module.exports = router;