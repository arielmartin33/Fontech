const express = require('express');
const router = express.Router();
const multer = require('multer');

const productsController = require('../controllers/productsController');

// ******** Listado de productos ************

router.get('/', productsController.index);

// ********* Seleccionar un producto *********

router.get('/:id', productsController.detail),

// ********* Crear un nuevo producto ********

router.get('/product-create/', productsController.create);
router.post('/', productsController.create);

// ******** Editar un producto ********
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);

// ********* Borrar un producto *******

router.delete('/:id', productsController.destroy);

module.exports = router;