const mongoCollection = require("../config/mongoCollections");
const projects = mongoCollection.projects;
const {ObjectId} = require("mongodb");


// update 3/17
async function addProject(req, res) {
    if (!req.body.projectName || typeof req.body.projectName !== 'string') throw 'name of project is empty or invalid input type';
    const projectCollection = await projects();
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
    const projectCollection = await projects();
    const project = await projectCollection.findOne({_id: objId});
    if (!project) {
        res.status(400).send({message: "Project not found"})
    }
    return res.status(200).json(project)
}

async function editProject(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const projectCollection = await projects();
    let editInfo = {};
    if (req.body.projectName) {
        editInfo.projectName = req.body.projectName;
    }

    if (req.body.status) {
        editInfo.status = req.body.status;
    }

    if (JSON.stringify(editInfo) !== '{}') {
        const editStatus = await projectCollection.updateOne({_id: objId}, {$set: editInfo});
        if (editStatus.modifiedCount === 0) throw "Edit failed!";
    }

    return res.status(200).send({message: "Edit succeeded!"})
}
module.exports = {
    addProject,
    getProjectById,
    editProject,
}
