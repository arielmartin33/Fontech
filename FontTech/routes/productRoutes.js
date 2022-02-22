const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');

// ******** Listado de productos ************

router.get('/', productsController.index);

// ********* Crear un nuevo producto ********

router.get('/create', productsController.create);
// router.post('/', productsController.create);

// ********* Seleccionar un producto *********
router.get('/:id', productsController.detail),



// ******** Editar un producto ********
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);

// ********* Borrar un producto *******

router.delete('/:id', productsController.destroy);

module.exports = router;