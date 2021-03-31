const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");
const helperFun = require("./user.helper");


async function getUserById(req, res) {
    // if(!req.body.id || typeof req.body.id !== 'string')  throw 'invalid id is provided';
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await users();
    const user = await userCollection.findOne({_id: objId});
    if(!user) {
        res.status(400).send({message: "User not found"})
    }
    return res.status(200).json(user);
}

async function getUserIdByEmail(req, res) {
    const objEmail = ObjectId.createFromHexString(req.email);
    const userCollection = await users();
    const user = await userCollection.findOne({email: objEmail});
    if (!user) {
        res.status(400).send({message: "User not found"})
    }
    return res.status(200).json(user._id);
}

async function updateUserAccount(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await users();
    let updateInfo = {};
    if(req.body.firstName) {
        updateInfo.firstName = req.body.firstName;
    }
    if(req.body.lastName) {
        updateInfo.lastName = req.body.lastName;
    }
    if(req.body.phoneNumber) {
        updateInfo.phoneNumber = req.body.phoneNumber;
    }
    if(JSON.stringify(updateInfo) !== '{}') {
        const updatedStatus = await userCollection.updateOne({_id: objId}, {$set:updateInfo});
        if(updatedStatus.modifiedCount === 0) throw "fail to reset password";
    }
    return res.status(200).send({message: "User account updated successfully."})
}

async function resetPassword(req, res) {

    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await users();
    const user = await userCollection.findOne({_id: objId});
    let isPwdMatched = await bcrypt.compare(req.body.ori_password, user.password);

    if (!isPwdMatched) {
        return res.status(200).json({
            status: false
        })
        
    }
    let updateInfo = {};
    if(req.body.password) {
        const hashPwd = await bcrypt.hash(req.body.password, 5);
        updateInfo.password = hashPwd;
    }
    if(JSON.stringify(updateInfo) !== '{}') {
        const updatedStatus = await userCollection.updateOne({_id: objId}, {$set:updateInfo});
        if(updatedStatus.modifiedCount === 0) throw "fail to change password";
    }
    return res.status(200).json({
        status: true
    })
}



module.exports = {
    getUserById,
    updateUserAccount,
    getUserIdByEmail,
    resetPassword,
};