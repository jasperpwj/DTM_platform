const mongoCollection = require("../config/mongoCollections");
const usersController = mongoCollection.users;
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");
const helperFun = require("./helper.controller");




async function getUserById(req, res) {
    // if(!req.body.id || typeof req.body.id !== 'string')  throw 'invalid id is provided';
    console.log("users.control")
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await usersController();
    const user = await userCollection.findOne({_id: objId});
    if(!user) {
        res.status(400).send({message: "User not found"})
    }
    console.log(user)
    return res.status(200).json(user);
}

async function getUserByEmail(email) {
    const isValid = helperFun.validateEmail(email);
    if(!email || !isValid) throw 'input email is invalid';
    const userCollection = await usersController();
    const user = await userCollection.findOne({email: email});
    if(!user) throw 'No user found';
    return user;
}

async function getUserIdByEmail(email) {
    const user = getUserByEmail(email);
    return user._id;
}

async function updateUserEmail(id, email) {
    if(!id || typeof id !== 'string')  throw 'invalid id is provided';
    const isValid = helperFun.validateEmail(email);
    if(!email || !isValid) throw 'input email is invalid';

    let userToBeUpdated = await getUserById(id);
    userToBeUpdated.email = email;
    // console.log(userToBeUpdated);
    // Object.assign(userToBeUpdated, email);
    const userCollection = await usersController();
    const objId = Object.createFromHexString(id);
    const updateInfo = await userCollection.updateOne({_id: objId}, {$set: userToBeUpdated});
    if (updateInfo.modifiedCount === 0) throw 'Update failed';
    return await getUserById(id);
}


module.exports = {
    getUserById,
    getUserByEmail,
    getUserIdByEmail,
    updateUserEmail,
};