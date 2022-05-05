const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/api/userController");

router.get("/api/users/detail/:id", usersController.detail);
router.get("/api/user", usersController.list);

module.exports = router;