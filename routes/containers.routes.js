const express = require("express");
const router = express.Router();
const {authJwt} =require("../middlewares");
const containerController = require("../controllers/containers.controller");

require('dotenv').config();

router.post("/:projectId/addContainer", [authJwt.verifyToken], containerController.addContainer);

router.get("/:projectId/getContainers", [authJwt.verifyToken], containerController.getContainersByProjectId);

router.patch("/:containerId/editContainer", [authJwt.verifyToken], containerController.editContainerByContainerId);

router.delete("/:containerId/deleteContainer",[authJwt.verifyToken], containerController.deleteContainer);

module.exports = router;