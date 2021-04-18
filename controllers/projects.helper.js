const mongoCollection = require("../config/mongoCollections");
const projects = mongoCollection.projects;
const {ObjectId} = require("mongodb");
const users = mongoCollection.users;

async function getProjectListByUserId(userId) {
    const userMongoId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    return user.projects;
}

async function addProjectIdToUser(userId, projectId) {
    const userMongoId = ObjectId.createFromHexString(userId);
    let projectMongoId;
    if(!ObjectId.isValid(projectId)) {
        projectMongoId = ObjectId.createFromHexString(projectId);
    } else {
        projectMongoId = projectId;
    }
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    const additionResult = await userCollection.update({_id: userMongoId}, {$addToSet: {projects: projectMongoId}});
    if(additionResult.modifiedCount === 0) throw "Fail to add project Id to the user";
    return true;
}

async function getProjectById(projectId) {
    const projectMongoId = ObjectId.createFromHexString(projectId);
    const projectCollection = await projects();
    const project = await projectCollection.findOne({_id: projectMongoId});
    if(!project) throw " No project found";
    return project;
}

async function getUserById(userId) {
    const userMongoId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    return user;
}

async function getUserByUsername(username) {
    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (!user) throw 'No user found';
    return user;
}

async function removeProjectFromUser(projectId, userId) {
    const projectMongoId = ObjectId.createFromHexString(projectId);
    const userCollection = await users();
    let deleteProjectFromUser = await userCollection.updateOne({ _id: userId }, { $pull: { projects: projectMongoId } });
    if (deleteProjectFromUser.modifiedCount === 0) throw "Failed to delete project from user"
    return true;
}


module.exports = {
    getProjectListByUserId,
    addProjectIdToUser,
    getProjectById,
    getUserById,
    getUserByUsername,
    removeProjectFromUser,
};

