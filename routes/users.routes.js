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

module.exports = router;
