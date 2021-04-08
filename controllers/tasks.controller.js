const mongoCollection = require("../config/mongoCollections");
const tasks = mongoCollection.tasks;
const containers = mongoCollection.containers;
const {ObjectId} = require("mongodb");

async function createTask(req, res) {
    /*
    params in req.body: containerId, content
     */
    const taskCollection  = await tasks();
    const containerMongoId = ObjectId.createFromHexString(req.body.containerId);
    let task = {
        title: req.body.title,
        content: req.body.content,
        createDate: new Date().toLocaleString(),
        lastUpdatedTime: new Date().toLocaleString(),
        requester: ObjectId.createFromHexString(req.id),
        assignee:"",
        editor: ObjectId.createFromHexString(req.id),
        status: "active", // active OR completed OR issue
        image: "",
        priority:"",
        container: containerMongoId,
    };
    const insertStatus = await taskCollection.insertOne(task);
    if(insertStatus.insertedCount === 0) throw 'Fail to create new task';
    let taskId = insertStatus.insertedId;
    const containerCollection = await containers();
    const container = await containerCollection.findOne({_id: containerMongoId});
    container.tasks.push(taskId);
    let containerInfoToBeUpdated = {
        lastUpdatedTime: new Date().toLocaleString(),
        taskCount: container.taskCount + 1,
        tasks: container.tasks
    };
    const updatedStatus = await containerCollection.updateOne({_id: containerMongoId},{$set: containerInfoToBeUpdated});
    if(updatedStatus.modifiedCount === 0) throw "Fail to add task id to the container";
    return res.status(200).send({message: "Create task successfully"})
}

async function getTaskById(req, res) {
    const tasksCollection = await tasks();
    const task = await tasksCollection.findOne({_id: ObjectId.createFromHexString(req.params.taskId)});
    let taskContent = {
        title: task.title,
        content: task.content,
    };
    return res.status(200).json(taskContent);
}

async function editTask(req, res) {
    /*
    params in the req.body: taskId, title, content
     */
    const tasksCollection = await tasks();
    let taskObjToBeUpdated = {
        title: req.body.title,
        content: req.body.content,
        lastUpdatedTime: new Date().toLocaleString(),
        editor: ObjectId.createFromHexString(req.id),
    };
    const updatedStatus = await tasksCollection.updateOne({_id: ObjectId.createFromHexString(req.body.taskId)}, {$set: taskObjToBeUpdated});
    if(updatedStatus.modifiedCount === 0) throw `Fail to update task of id: ${req.body.taskId}`;
    return res.status(200).send({message: "update task information successfully"});
}

async function updateDraggingTask(req, res) {
    /*
    params in the req.body: sourceContainerId, destContainerId, sourceTaskId, sourceTaskIndex, destTaskIndex
     */
    const containerCollection = await containers();
    const sourceContainerMongoId = ObjectId.createFromHexString(req.body.sourceContainerId);
    const sourceContainer = await containerCollection.findOne({_id: sourceContainerMongoId});
    if(!sourceContainer) throw `Fail to find the source container with id: ${req.body.sourceContainerId}`;
    if(req.body.sourceContainerId !== req.body.destContainerId) {
        const destContainerMongoId = ObjectId.createFromHexString(req.body.destContainerId);
        const destContainer = await containerCollection.findOne({_id: destContainerMongoId});
        if(!destContainer) throw `Fail to find the destination container with id: ${req.body.destContainerId}`;
        const [removed] = await sourceContainer.tasks.splice(req.body.sourceTaskIndex, 1);
        destContainer.tasks.splice(req.body.destTaskIndex, 0, removed);
        let sourceContainerUpdatedInfo = {
            taskCount: sourceContainer.tasks.length,
            lastUpdatedTime: new Date().toLocaleString(),
            tasks: sourceContainer.tasks,
        };
        const updateSourceContainer = await containerCollection.updateOne({_id: sourceContainerMongoId}, {$set: sourceContainerUpdatedInfo});
        if(updateSourceContainer.modifiedCount === 0) throw "Fail to update source container info";
        let destContainerUpdatedInfo = {
            taskCount: destContainer.tasks.length,
            lastUpdatedTime: new Date().toLocaleString(),
            tasks: destContainer.tasks,
        };
        const updateDestContainer = await containerCollection.updateOne({_id: destContainerMongoId}, {$set: destContainerUpdatedInfo});
        if(updateDestContainer.modifiedCount === 0) throw "Fail to update the dest container info";
        const tasksCollection = await tasks();
        const task = await tasksCollection.updateOne({_id:ObjectId.createFromHexString(req.body.sourceTaskId)}, {$set:{container: destContainerMongoId}});
        if(task.modifiedCount === 0) throw `Fail to update the container id in the task`;
    } else {
        const [removed] = sourceContainer.tasks.splice(req.body.sourceTaskIndex, 1);
        sourceContainer.tasks.splice(req.body.destTaskIndex, 0, removed);
        const containersCollection = await containers();
        const containerInfoToBeUpdate = {
            lastUpdatedTime: new Date().toLocaleString(),
            tasks: sourceContainer.tasks,
        };
        const updateSourceContainer = await containersCollection.updateOne({_id: sourceContainerMongoId}, {$set: containerInfoToBeUpdate});
        if(updateSourceContainer.modifiedCount === 0) throw "Fail to update source container Info";
    }
    return res.status(200).send({message: "Update dragging task successfully"})
}

async function deleteTask(req, res) {
    /*
    params in the req.body: taskId, containerId
    */
    const taskMongoId = ObjectId.createFromHexString(req.body.taskId);
    const containersCollection = await containers();
    const container = await containersCollection.findOne({_id: ObjectId.createFromHexString(req.body.containerId)});
    const tasksCollection = await tasks();
    for(let [index, value] of container.tasks.entries()) {
        if(value.equals(req.body.taskId)) {
            container.tasks.splice(index, 1);
        }
    }
    let containerInfoToBeUpdated = {
        lastUpdatedTime: new Date().toLocaleString(),
        taskCount: container.tasks.length,
        tasks: container.tasks,
    };
    const containerUpdatedStatus = await containersCollection.updateOne({_id: ObjectId.createFromHexString(req.body.containerId)}, {$set:containerInfoToBeUpdated});
    if(containerUpdatedStatus.modifiedCount === 0) throw "Fail to remove task id from container";
    const deleteStatus = await tasksCollection.deleteOne({_id: taskMongoId});
    if(deleteStatus.deletedCount === 0) throw "Fail to delete task from the task database";
    return res.status(200).send({message: "delete task successfully"});
}

async function completeTask(req, res) {
    /*
    params in req.boy: taskId, projectId
    Steps: 1. change task status into completed
     */
    console.log(req.body)
    const tasksCollection = await tasks();
    let taskToBeUpdated = {
        lastUpdatedTime: new Date().toLocaleString(),
        status: "completed",
        editor: ObjectId.createFromHexString(req.id),
    };
    const updatedStatus = await tasksCollection.updateOne({_id: ObjectId.createFromHexString(req.body.taskId)},{$set: taskToBeUpdated});
    if(updatedStatus.modifiedCount === 0) throw "Fail to change the task status into completed";
    return res.status(200).send({message: "Change the task status into completed successfully"});

}

module.exports = {
    createTask,
    getTaskById,
    editTask,
    updateDraggingTask,
    deleteTask,
    completeTask,
};