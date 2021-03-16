const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
require('dotenv').config();

router.post("/sign-up",
    [
        verifySignUp.checkExistedUsernameOrEmail
    ],
    controller.signUp
);

router.post("/login", controller.login);

module.exports = router;

