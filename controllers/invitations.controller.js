const mongoCollection = require("../config/mongoCollections");
const invitations = mongoCollection.invitations;
const { ObjectId } = require("mongodb");
const invitationHelper = require("./invitation.helper");
const projectHelper = require("./projects.helper");

async function addInvitation(req, res) {
    if (!req.body.invType || typeof req.body.invType !== 'string') throw 'invitation type is empty or invalid input type';
    if (!req.body.targetUsername || typeof req.body.targetUsername !== 'string') throw 'Target username is empty or invalid input type';
    let memberValid = await invitationHelper.checkProjectMember(req.body.projectId, req.body.targetUsername);
    let userValid = await invitationHelper.checkUserExist(req.body.targetUsername);
    let invitationValid = await invitationHelper.checkDupInvitations(req.body.projectId, req.body.targetUsername);

    if (memberValid && userValid && invitationValid) {
        const invitationCollection = await invitations();
        const fromUser = await invitationHelper.getUserById(req.id);
        const fromUserName = fromUser.username;
        const targetProject = await projectHelper.getProjectById(req.body.projectId);
        let newInvitation = {
            fromUser: fromUserName,
            invType: req.body.invType,
            invDate: new Date().toLocaleDateString(),
            projId: req.body.projectId,
            projName: targetProject.projectName
        };
        const insertInfo = await invitationCollection.insertOne(newInvitation);
        if (insertInfo.insertedCount === 0) throw "fail to add new project in the database";
        //add invitationId to user
        const invitationId = insertInfo.insertedId;
        const additionResult = await invitationHelper.addInvitationIdToUser(req.body.targetUsername, invitationId);
        if (!additionResult) throw 'Fail to add invitation Id to the user';
    }
    return res.status(200).json({
        userExistValid: userValid,
        projMemberValid: memberValid,
        dupInvValid: invitationValid
    });
}

async function getInvitations(req, res) {
    const invitationList = await invitationHelper.getInvitationsByUserId(req.id);
    if (invitationList !== undefined && !invitationList.length) {
        res.status(200).send(invitationList);
    } else {
        const invitationCollection = await invitations();
        let invList = [];
        for (let invitation of invitationList) {
            let invitationMongoId = ObjectId.createFromHexString(invitation);
            const inv = await invitationCollection.findOne({ _id: invitationMongoId });
            if (inv !== null) {
                invList.push(inv);
            }
        }
        res.status(200).json(invList);
    }
}

async function getInvitationById(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const invitationCollection = await invitations();
    const invitation = await invitationCollection.findOne({ _id: objId });
    if (!invitation) {
        res.status(400).send({ message: "Invitation not found" });
    }
    return res.status(200).json(invitation);
}

async function dealInvitation(req, res) {
    if (!req.body.status || typeof req.body.status !== "string") throw "invitation status is empty or type invalid";
    const targetInvitation = await invitationHelper.getInvitationById(req.body.invitationId);
    if (req.body.status === "accept") {
        await invitationHelper.addUserToProject(targetInvitation.invType, req.id, targetInvitation.projId);
        await invitationHelper.addProjectToUser(req.id, targetInvitation.projId);
    }
    await invitationHelper.removeInvitationFromUser(req.id, req.body.invitationId);
    await invitationHelper.removeInvitation(req.body.invitationId);
    return res.send({ message: "Invitation is done successfully" });
}


module.exports = {
    addInvitation,
    getInvitations,
    getInvitationById,
    dealInvitation
};
