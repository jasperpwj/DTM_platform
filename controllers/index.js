const userData = require("./users.controller");
const projectData = require("./projects.controller");
const containerData = require("./containers.controller");

module.exports = {
    users: userData,
    projects: projectData,
    containers: containerData
};
