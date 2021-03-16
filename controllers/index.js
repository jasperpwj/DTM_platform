const userData = require("./users.controller");
const projectData = require("./projects.controller");
const containerData = require("./containers.controller");
const taskData = require("./tasks.controller");

module.exports = {
    users: userData,
    projects: projectData,
    containers: containerData,
    tasks: taskData
};
