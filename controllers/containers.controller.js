const mongoCollection = require("../config/mongoCollections");
const projects = mongoCollection.projects;
const users = mongoCollection.users;
const containers = mongoCollection.containers;
const {ObjectId} = require("mongodb");


async function addContainer(req, res) {
    const projectCollection = await projects();
    const containerCollection = await containers();
    let containerObj = {
        containerName: req.body.containerName,
        createDate: new Date().toLocaleString(),
        lastUpdatedTime: new Date().toLocaleString(),
        taskCount: 0,
        tasks: [],
        nextContainer: "",
        automation: req.body.automation,
    }
    const insertContainerStatus = await containerCollection.insertOne(containerObj);
    if(insertContainerStatus.insertedCount === 0) throw "fail to add new container to the project";

    let containerId = insertContainerStatus.insertedId;
    const projectMongoId = ObjectId.createFromHexString(req.body.projectId);
    const insertContainerIdToProjectStatus = await projectCollection.updateOne({_id: projectMongoId}, {$addToSet: {containers: containerId}});
    if(!insertContainerIdToProjectStatus.modifiedCount === 0) throw "Fail to add container Id to the project"
    res.status(200).json({message: "successfully create a container and add it to the project"});
}

async function getContainersByProjectId(req, res) {
    const projectCollection = await projects();
    const containerCollection = await containers();
    let projectMongoId = ObjectId.createFromHexString(req.params.projectId);
    const project = await projectCollection.findOne({_id: projectMongoId});
    if(!project) throw `Fail to find the project with provided Id: ${req.params.projectId}`;
    let containerList = {};
    if(!project.containers.length) {
        return res.status(200).send(containerList);
    } else {
        for(let containerId of project.containers) {
            const container = await containerCollection.findOne({_id: containerId});
            containerList[container._id] = container;
        }
    }
    res.status(200).json(containerList);
}

async function editContainerByContainerId(req, res) {
    const containerCollection = await containers();
    let containerMongoId = ObjectId.createFromHexString(req.body.containerId);
    let containerInfo = {}
    if(req.body.containerName) {
        containerInfo.containerName = req.body.containerName;
    }
    containerInfo.lastUpdateTime = new Date().toLocaleString();
    const updatedStatus = await containerCollection.updateOne({_id: containerMongoId}, {$set: containerInfo});
    if(updatedStatus.modifiedCount === 0) throw 'Fail to update container information';
    return res.status(200).send({message: "Update container information successfully"})
}

async function deleteContainer(req, res) {
    console.log(req.body);
    return;
}

module.exports = {
    addContainer,
    getContainersByProjectId,
    editContainerByContainerId,
    deleteContainer,
};