const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const xss = require("xss");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const {authJwt} =require("../middlewares");
const userController = require("../controllers/users.controller");

require('dotenv').config();


router.get("/account", [authJwt.verifyToken], userController.getUserById);

router.patch("/edit_account", [authJwt.verifyToken], userController.updateUserAccount);

router.patch("/reset_password", [authJwt.verifyToken], userController.resetPassword);

module.exports = router;
