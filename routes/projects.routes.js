const express = require("express");
const router = express.Router();
const {authJwt} =require("../middlewares");
const projectController = require("../controllers/projects.controller");

require('dotenv').config();

router.post("/create_project", [authJwt.verifyToken], projectController.addProject);

router.get("/open_projects", [authJwt.verifyToken], projectController.getOpenProjects);

router.get("/closed_projects", [authJwt.verifyToken], projectController.getClosedProjects);

router.post("/getProjectContent", [authJwt.verifyToken], projectController.getProjectContent);

router.patch("/change_project_status", [authJwt.verifyToken], projectController.changeProjectStatus);

router.patch("/edit_project", [authJwt.verifyToken], projectController.editProject);

router.post("/search_projects", [authJwt.verifyToken], projectController.getSearchProjects);

module.exports = router;