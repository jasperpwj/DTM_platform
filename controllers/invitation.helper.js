const mongoCollection = require("../config/mongoCollections");
const {ObjectId} = require("mongodb");
const users = mongoCollection.users;
const invitations = mongoCollection.invitations;
const projects = mongoCollection.projects;

async function getUserById(userId) {
    const userMongoId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    return user;
}

async function getUserByUsername(username) {
    const userCollection = await users();
    const user = await userCollection.findOne({username:username});
    if(!user) throw 'No user found';
    return user;
}

async function getInvitationsByUserId(userId) {
    // const user = await getUserById(userId);
    const userMongoId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    return user.invitations;
}

async function addInvitationIdToUser(username, invitationId) {
    const targetUser = await getUserByUsername(username);
    const userMongoId = targetUser._id;
    let invitationMongoId = ObjectId.createFromHexString(invitationId);
    
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    const additionResult = await userCollection.update({_id: userMongoId}, {$addToSet: {invitations: invitationMongoId}});
    if(additionResult.modifiedCount === 0) throw "Fail to add project Id to the user";
    return true;
}

async function removeInvitationFromUser(userId, invitationId) {
    const userMongoId = ObjectId.createFromHexString(userId);
    let invitationMongoId = ObjectId.createFromHexString(invitationId);
    const userCollection = await users();
    const user = await userCollection.findOne({_id:userMongoId});
    if(!user) throw 'No user found';
    const deleteInvitationFromUser = await userCollection.updateOne({_id:userMongoId}, {$pull:{invitations: invitationMongoId}});
    if(deleteInvitationFromUser.modifiedCount === 0) throw "Fail to remove invitation id from user";
    
    return true;
}

async function removeInvitation(invitationId) {
    let invitationMongoId = ObjectId.createFromHexString(invitationId);
    const invitationCollection = await invitations();
    const deleteInfo = await invitationCollection.removeOne({_id: invitationMongoId});
    if (deleteInfo.deletedCount === 0) throw "Invitation deletion failed";
    return true;
}

async function addUserToProject(type, userId, projectId) {
    // add validation when necessary
    userMongoId = ObjectId.createFromHexString(userId);
    projectMongoId = ObjectId.createFromHexString(projectId);
    const projectCollection = await projects();
    if (type === "developer") {
        let additionResult = await projectCollection.update({_id: projectMongoId}, {$addToSet: {developers: userId}});
        if(additionResult.modifiedCount === 0) throw "Fail to add user Id to the developers";
    }
    else if (type === "client") {
        let additionResult = await projectCollection.update({_id: projectMongoId}, {$addToSet: {clients: userId}});
        if(additionResult.modifiedCount === 0) throw "Fail to add user Id to the clients";
    }
    else {
        throw "Invalid member type";
    }
    return true;
}

async function getInvitationById(invitationId) {
    const invitationMongoId = ObjectId.createFromHexString(invitationId);
    const invitationCollection = await invitations();
    const invitation = await invitationCollection.findOne({_id:invitationMongoId});
    if(!invitation) throw 'No user found';
    return invitation;
}

module.exports = {
    getUserById,
    getInvitationsByUserId,
    addInvitationIdToUser,
    removeInvitation,
    removeInvitationFromUser,
    addUserToProject,
    getUserByUsername,
    getInvitationById
}