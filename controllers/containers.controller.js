const mongoCollection = require("../config/mongoCollections");
const containers = mongoCollection.containers;
const {ObjectId} = require("mongodb");

async function addContainer(title, priority) {
    if(!title || typeof title !== 'string') throw 'title is empty or invalid input type';
    if(!priority || typeof priority !== 'string' || isNaN(Number(priority))) throw 'priority is empty or invalid input type';

    const containerCollection = await containers();
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
    const containerCollection = await containers();
    const container = await containerCollection.findOne({_id: objId});
    if(!container) throw 'No container found';
    return container;
}

async function editContainer(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const containerCollection = await containers();
    let editInfo = {};
    if (req.body.title) {
        editInfo.title = req.body.title;
    }

    if (req.body.priority) {
        editInfo.priority = req.body.priority;
    }

    if (JSON.stringify(editInfo) !== '{}') {
        const editStatus = await containerCollection.updateOne({_id: objId}, {$set: editInfo});
        if (editStatus.modifiedCount === 0) throw "Edit failed!";
    }

    return res.status(200).send({message: "Edit succeeded!"})
}

module.exports = {
    addContainer,
    getContainerById,
    editContainer,
};