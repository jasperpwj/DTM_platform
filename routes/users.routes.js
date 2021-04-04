const express = require("express");
const router = express.Router();
const {authJwt} =require("../middlewares");
const userController = require("../controllers/users.controller");
const userController_1 = require("../controllers/upload.js");



require('dotenv').config();


router.get("/account", [authJwt.verifyToken], userController.getUserById);

router.patch("/edit_account", [authJwt.verifyToken], userController.updateUserAccount);

router.patch("/reset_password", [authJwt.verifyToken], userController.resetPassword);

router.patch("/reset_head", [authJwt.verifyToken], userController_1.uploadHead);

module.exports = router;
