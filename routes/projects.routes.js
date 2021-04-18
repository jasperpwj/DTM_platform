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

router.post("/project_member", [authJwt.verifyToken], projectController.getProjectMember);

router.post("/search_projects", [authJwt.verifyToken], projectController.getSearchProjects);

router.get("/project_data", [authJwt.verifyToken], projectController.getDashboardData);

router.patch("/delete_project_member", [authJwt.verifyToken], projectController.deleteProjectMember);

module.exports = router;