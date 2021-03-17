const mongoCollection = require("../config/mongoCollections");
const tasks = mongoCollection.tasks;
const {ObjectId} = require("mongodb");

async function addTask(title, editor, priority, content, container) {
    if (!title || typeof title !== 'string' || !title.trim()) throw 'title does not exist or invalid type';
    if (!editor || typeof editor !== 'string' || !editor.trim()) throw 'editor does not exist or invalid type';
    if (!priority || typeof priority !== 'string' || isNaN(priority)) throw 'priority is empty or invalid input type';
    if (!content || typeof content !== 'string' || !content.trim()) throw 'content does not exist or invalid type';
    if (!container || typeof container !== 'string' || !container.trim()) throw 'container does not exist or invalid type';

    const taskCollection = await tasks();
    let newTask = {
        title: title,
        editor: editor,
        create_date: new Date().toLocaleString(),
        last_edited_date: new Date().toLocaleString(),
        priority: priority,
        content: content,
        image: "",
        container: container
    }
    const insertInfo = await taskCollection.insertOne(newTask);
    if(insertInfo.insertedCount === 0) throw 'fail to add the new task in the database';
    return true
}

async function getTaskById(id) {
    if(!id || typeof id !== 'string')  throw 'invalid id is provided';
    const objId = ObjectId.createFromHexString(id);
    const taskCollection = await tasks();
    const task = await taskCollection.findOne({_id: objId});
    if(!task) throw 'No task found';
    return task;
}

async function removeTask(id) {
    if (!id || typeof id !== "string" || !id.trim()) throw "Invalid id";
    const objId = ObjectId(id);
    const taskCollection = await tasks();
    const deleteInfo = await taskCollection.removeOne({ _id: objId });
    if (deleteInfo.deletedCount === 0) throw "Deletion failed";
}

async function editTask(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const taskCollection = await tasks();
    let editInfo = {};
    if(req.body.title) {
        editInfo.title = req.body.title;
    }
    if(req.body.priority) {
        editInfo.priority = req.body.priority;
    }
    if(req.body.content) {
        editInfo.content = req.body.content;
    }
    if(JSON.stringify(editInfo) !== '{}') {
        const editStatus = await taskCollection.updateOne({_id: objId}, {$set:editInfo});
        if(editStatus.modifiedCount === 0) throw "Edit failed!";
    }
    return res.status(200).send({message: "Edit succeeded!"})
}


module.exports = {
    addTask,
    getTaskById,
    removeTask,
    editTask,
}