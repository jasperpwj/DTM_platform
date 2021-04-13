const express = require("express");
const router = express.Router();
const {authJwt} =require("../middlewares");
const invitationController = require("../controllers/invitations.controller");

require('dotenv').config();

router.get("/invitations", [authJwt.verifyToken], invitationController.getInvitations);

router.post("/deal_invitation", [authJwt.verifyToken], invitationController.dealInvitation);

router.post("/send_invitation", [authJwt.verifyToken], invitationController.addInvitation);

module.exports = router;