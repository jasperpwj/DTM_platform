const mongoCollection = require("../config/mongoCollections");
const projectsController = mongoCollection.projects;
const {ObjectId} = require("mongodb");


// update 3/17
async function addProject(req, res) {
    if (!req.body.projectname || typeof req.body.projectname !== 'string') throw 'name of project is empty or invalid input type';
    const projectCollection = await projectsController();
    let newProject = {
        projectName: projectName,
        status: true,  // open: true, close: false
        initial_Date: new Date().toLocaleString(),
        owner: owner_email,  // owner is the string of email
        developers: [],
        clients: [],
        containers: [],
        tasks: []
    }
    const insertInfo = await projectCollection.insertOne(newProject);
    if (insertInfo.insertedCount === 0) throw "fail to add new project in the database";
    return res.send({message: "Project is created successfully"});
}


async function getProjectById(req, res) {
    // if (!id || typeof id !== "string") throw "invalid id is provided";
    const objId = ObjectId.createFromHexString(req.id);
    const projectCollection = await projectsController();
    const project = await projectCollection.findOne({_id: objId});
    if (!project) {
        res.status(400).send({message: "Project not found"})
    }
    return res.status(200).json(project)
}

module.exports = {
    addProject,
    getProjectById,
}
