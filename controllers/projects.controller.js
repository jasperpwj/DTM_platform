const mongoCollection = require("../config/mongoCollections");
const projectsController = mongoCollection.projects;
const {ObjectId} = require("mongodb");

async function addProject(projectName, owner_email) {
    if (!projectName || typeof projectName !== "string") throw "name of project is empty or invalid input type";
    if (!owner_email || typeof status !== "string") throw "owner's email is empty or invalid input type";
    const projectCollection = await projectsController();  // get projectsController database
    let newProject = {
        projectName: projectName,
        status: true,  // open: true, close: false
        initial_Date: new Date().toLocaleString(),
        owner: owner_email,  // owner is the string of email
        developers: [],
        clients: [],
        containers: [],
        tasks: []
    };
    const insertInfo = await projectCollection.insertOne(newProject);
    if (insertInfo.insertedCount === 0) throw "fail to add new project in the database";
    return true; // return true when project added successfully
}

async function getProjectById(id) {
    if (!id || typeof id !== "string") throw "invalid id is provided";
    const objId = ObjectId.createFromHexString(id);
    const projectCollection = await projectsController();
    const project = await projectCollection.findOne({_id: objId});
    if (!project) throw "No project found";
    return project;
}

module.exports = {
    addProject,
    getProjectById,
}
