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

router.get('/:id', productsController.detail),


router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update); 
 





// // ******** Editar un producto *******


// // ********* Borrar un producto *******

/* router.post('/:id', productsController.delete); */

module.exports = router;