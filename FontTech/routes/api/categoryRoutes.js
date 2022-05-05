const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/api/categoryController");

/* router.get("/api/categor/detail/:id", Controller.detail);
 */
router.get("/api/categories", categoryController.list);

module.exports = router;