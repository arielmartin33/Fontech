const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

// router.get('/login', mainController.login);

// router.get('/registro', mainController.register);

// router.get('/carrito', mainController.carrito);

// router.get('/products', mainController.products);

module.exports = router;