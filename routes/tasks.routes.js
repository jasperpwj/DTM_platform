const express = require("express");
const router = express.Router();
const {authJwt} =require("../middlewares");
const taskController = require("../controllers/tasks.controller");
require('dotenv').config();

router.post("/:containerId/createTask", [authJwt.verifyToken], taskController.createTask);
router.patch("/:containerId/editTask", [authJwt.verifyToken], taskController.editTask);
router.patch("/updateDraggingTask", [authJwt.verifyToken], taskController.updateDraggingTask);
router.post("/deleteTask", [authJwt.verifyToken], taskController.deleteTask);

module.exports = router;