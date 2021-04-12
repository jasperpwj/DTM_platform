const express = require("express");
const router = express.Router();
const {authJwt} =require("../middlewares");
const taskController = require("../controllers/tasks.controller");
require('dotenv').config();

router.post("/:containerId/createTask", [authJwt.verifyToken], taskController.createTask);
router.get("/getTask/:taskId", [authJwt.verifyToken], taskController.getTaskById);
router.get("/getTasks/:projectId", [authJwt.verifyToken], taskController.getTasksByProjectId);
router.get("/getCompletedTasks/:projectId", [authJwt.verifyToken], taskController.getCompletedTasksByProjectId);
router.get("/getIssues/:projectId", [authJwt.verifyToken], taskController.getIssuesByProjectId);
router.patch("/:taskId/editTask", [authJwt.verifyToken], taskController.editTask);
router.patch("/updateDraggingTask", [authJwt.verifyToken], taskController.updateDraggingTask);
router.post("/deleteTask", [authJwt.verifyToken], taskController.deleteTask);
router.post("/completeTask", [authJwt.verifyToken], taskController.completeTask);
router.post("/turnIntoIssue", [authJwt.verifyToken], taskController.turnTaskIntoIssue);

module.exports = router;