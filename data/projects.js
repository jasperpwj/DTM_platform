const mongoCollection = require("../config/mongoCollections");
const projects = mongoCollection.projects;
const {ObjectId} = require("mongodb");
const users = require("./users");

async function addProject(projectName, author) {
    if (!projectName || typeof projectName !== "string") throw "name of project is empty or invalid input type";
    if (!author || typeof status !== "string") throw "author is empty or invalid input type";
    const projectCollection = await projects();  // get projects database
    let newProject = {
        projectName: projectName,
        status: true,  // open: true, close: false
        initial_Date: new Date().toLocaleString(),
        author: users.getUserByEmail(author),  // author is the string of email
        developers: [this.author],  // author is the initial developer
        clients: [],
        containers: [],
        tasks: []
    };
    const insertInfo = await projectCollection.insertOne(newProject);
    if (insertInfo.insertedCount === 0) throw "fail to add new project in the database";
    return await getProjectById(insertInfo.insertedId.toString());
}

async function getProjectById(id) {
    if (!id || typeof id !== "string") throw "invalid id is provided";
    const objId = ObjectId.createFromHexString(id);
    const projectCollection = await projects();
    const project = await projectCollection.findOne({_id: objId});
    if (!project) throw "No project found";
    return project;
}

module.exports = {
    addProject,
    getProjectById,
}
