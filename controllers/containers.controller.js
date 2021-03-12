const mongoCollection = require("../config/mongoCollections");
const containersController = mongoCollection.containers;
const {ObjectId} = require("mongodb");

async function addContainer(title, priority) {
    if(!title || typeof title !== 'string') throw 'title is empty or invalid input type';
    if(!priority || typeof priority !== 'string' || isNaN(Number(priority))) throw 'priority is empty or invalid input type';

    const containerCollection = await containersController();
    let newContainer = {
        title: title,
        create_date: new Date().toLocaleString(),
        taskCount: 0,
        tasks: [],
        priority: priority,
        nextContainer: null
    };
    const insertInfo = await containerCollection.insertOne(newContainer);
    if(insertInfo.insertedCount === 0) throw 'fail to add the new container in the database';
    return true
}

async function getContainerById(id) {
    if(!id || typeof id !== 'string')  throw 'invalid id is provided';
    const objId = ObjectId.createFromHexString(id);
    const containerCollection = await containersController();
    const container = await containerCollection.findOne({_id: objId});
    if(!container) throw 'No container found';
    return container;
}

module.exports = {
    addContainer,
    getContainerById,
};