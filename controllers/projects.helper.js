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


module.exports = {
    getProjectListByUserId,
    addProjectIdToUser,
};

