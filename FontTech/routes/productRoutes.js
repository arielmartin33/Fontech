const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');
const uploadImage = require('../middlewares/imageMiddleware');

// ******** Listado de productos ************

router.get('/', productsController.index);

// ********* Crear un nuevo producto ********

router.get('/create', productsController.create);
router.post('/', uploadImage.array('images', 3), productsController.store);

// // ********* Seleccionar un producto *********
router.get('/:id/edit', productsController.edit);

router.get('/:id', productsController.detail),



// // ******** Editar un producto ********
/* router.put('/:id', productsController.update);
 */
// // ********* Borrar un producto *******

// router.delete('/:id', productsController.delete);

module.exports = router;