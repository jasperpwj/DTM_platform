const mongoCollection = require("../config/mongoCollections");
const projects = mongoCollection.projects;
const containers = mongoCollection.containers;
const tasks = mongoCollection.tasks;
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
        status: 'active', // active or deleted
        nextContainer: "",
        automation: req.body.automation,
    };
    const insertContainerStatus = await containerCollection.insertOne(containerObj);
    if(insertContainerStatus.insertedCount === 0) throw "fail to add new container to the project";

    let containerId = insertContainerStatus.insertedId;
    const projectMongoId = ObjectId.createFromHexString(req.body.projectId);
    const insertContainerIdToProjectStatus = await projectCollection.updateOne({_id: projectMongoId}, {$addToSet: {containers: containerId}});
    if(insertContainerIdToProjectStatus.modifiedCount === 0) throw "Fail to add container Id to the project";
    res.status(200).json({message: "successfully create a container and add it to the project"});
}

async function getContainersByProjectId(req, res) {
    const projectCollection = await projects();
    const containerCollection = await containers();
    const taskCollection = await tasks();

    let projectMongoId = ObjectId.createFromHexString(req.params.projectId);
    const project = await projectCollection.findOne({_id: projectMongoId});
    if(!project) throw `Fail to find the project with provided Id: ${req.params.projectId}`;
    let containerList = {};
    if(!project.containers.length) {
        return res.status(200).send(containerList);
    } else {
        for(let containerId of project.containers) {
            const container = await containerCollection.findOne({_id: containerId});
            if(container.tasks.length) {
                container.tasks = await taskCollection.find({_id:{$in: container.tasks}}).toArray();
            }
            containerList[container._id] = container;
        }
    }
    res.status(200).json(containerList);
}

async function editContainerByContainerId(req, res) {
    const containerCollection = await containers();
    let containerMongoId = ObjectId.createFromHexString(req.body.containerId);
    let containerInfo = {};
    if(req.body.containerName) {
        containerInfo.containerName = req.body.containerName;
    }
    containerInfo.lastUpdateTime = new Date().toLocaleString();
    const updatedStatus = await containerCollection.updateOne({_id: containerMongoId}, {$set: containerInfo});
    if(updatedStatus.modifiedCount === 0) throw 'Fail to update container information';
    return res.status(200).send({message: "Update container information successfully"})
}

async function deleteContainer(req, res) {
    /*
    params in req: projectId, containerId
    1. change container's status into deleted
    2. remove container id from corresponding project's container array
     */
    console.log(req.body);
    const containerCollection = await containers();
    let containerMongoId = ObjectId.createFromHexString(req.body.containerId);
    let updateInfo = {
        status: 'deleted',
        lastUpdatedTime: new Date().toLocaleString(),
    };
    const updateStatus = await containerCollection.updateOne({_id: containerMongoId}, {$set:updateInfo});
    if(updateStatus.modifiedCount === 0) throw "Fail to change the container status into deleted";
    const projectCollection = await projects();
    const projectMongoId = ObjectId.createFromHexString(req.body.projectId);
    const deleteContainerIdFromProject = await projectCollection.updateOne({_id:projectMongoId}, {$pull:{containers: containerMongoId}});
    if(deleteContainerIdFromProject.modifiedCount === 0) throw "Fail to remove container id from project";
    return res.status(200).send({message:"Delete container successfully"});
}

module.exports = {
    addContainer,
    getContainersByProjectId,
    editContainerByContainerId,
    deleteContainer,
};