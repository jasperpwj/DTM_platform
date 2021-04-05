const mongoCollection = require("../config/mongoCollections");
const tasks = mongoCollection.tasks;
const containers = mongoCollection.containers;
const {ObjectId} = require("mongodb");

async function createTask(req, res) {
    /*
    params in req.body: containerId, content
     */
    console.log("add task")
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
        image: "",
        priority:"",
        container: containerMongoId,
    };
    const insertStatus = await taskCollection.insertOne(task);
    if(insertStatus.insertedCount === 0) throw 'Fail to create new task';
    let taskId = insertStatus.insertedId;
    console.log(ObjectId.isValid(taskId));
    const containerCollection = await containers();
    const updatedStatus = await containerCollection.updateOne({_id: containerMongoId}, {$addToSet: {tasks:taskId}});
    if(updatedStatus.modifiedCount === 0) throw "Fail to add task id to the container";
    return res.status(200).send({message: "Create task successfully"})
}

async function editTask(req, res) {
    console.log(req.body)
    return;
}

module.exports = {
    createTask,
    editTask,
};