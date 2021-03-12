const mongoCollection = require("../config/mongoCollections");
const tasksController = mongoCollection.tasks;
const {ObjectId} = require("mongodb");

async function addTask(title, editor, priority, content, container) {
    if (!title || typeof title !== 'string' || !title.trim()) throw 'title does not exist or invalid type';
    if (!editor || typeof editor !== 'string' || !editor.trim()) throw 'editor does not exist or invalid type';
    if (!priority || typeof priority !== 'string' || isNaN(priority)) throw 'priority is empty or invalid input type';
    if (!content || typeof content !== 'string' || !content.trim()) throw 'content does not exist or invalid type';
    if (!container || typeof container !== 'string' || !container.trim()) throw 'container does not exist or invalid type';

    const taskCollection = await tasksController();
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
    const taskCollection = await tasksController();
    const task = await taskCollection.findOne({_id: objId});
    if(!task) throw 'No task found';
    return task;
}

async function removeTask(id) {
    if (!id || typeof id !== "string" || !id.trim()) throw "Invalid id";
    const objId = ObjectId(id);
    const taskCollection = await tasksController();
    const deleteInfo = await taskCollection.removeOne({ _id: objId });
    if (deleteInfo.deletedCount === 0) throw "Deletion failed";
}

async function updateTask(id, updatedTask) {
    if (!id || typeof id !== "string" || !id.trim()) throw "Invalid id";
    if (!updatedTask.title || typeof updatedTask.title !== 'string' || !updatedTask.title.trim()) {
        throw 'title does not exist or invalid type';
    }
    if (!updatedTask.editor || typeof updatedTask.editor !== 'string' || !updatedTask.editor.trim()) {
        throw 'editor does not exist or invalid type';
    }
    if (!updatedTask.create_date || typeof updatedTask.create_date !== 'string' || !updatedTask.create_date.trim()) {
        throw 'create_date does not exist or invalid type';
    }
    if (!updatedTask.last_edited_date || typeof updatedTask.last_edited_date !== 'string' || !updatedTask.last_edited_date.trim()) {
        throw 'last_edited_date does not exist or invalid type';
    }
    if (!updatedTask.priority || typeof updatedTask.priority !== 'string' || isNaN(priority)) {
        throw 'priority does not exist or invalid type';
    }
    if (!updatedTask.content || typeof updatedTask.content !== 'string' || !updatedTask.content.trim()) {
        throw 'content does not exist or invalid type';
    }
    if (!updatedTask.container || typeof updatedTask.container !== 'string' || !updatedTask.container.trim()) {
        throw 'container does not exist or invalid type';
    }
    const objId = ObjectId(id);
    const taskCollection = await tasksController();
    await taskCollection.updateOne({ _id: objId }, { $set: updatedTask });
    return await this.getTaskById(id);
}


module.exports = {
    addTask,
    getTaskById,
    removeTask,
    updateTask
}