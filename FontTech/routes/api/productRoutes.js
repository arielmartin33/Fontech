const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/api/productsController");

router.get("/api/product/detail/:id", productsController.detail);
router.get("/api/product", productsController.list);

module.exports = router;