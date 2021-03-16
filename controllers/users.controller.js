const mongoCollection = require("../config/mongoCollections");
const usersController = mongoCollection.users;
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");
const helperFun = require("./helper.controller");




async function getUserById(req, res) {
    // if(!req.body.id || typeof req.body.id !== 'string')  throw 'invalid id is provided';
    console.log("users.control");
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await usersController();
    const user = await userCollection.findOne({_id: objId});
    if(!user) {
        res.status(400).send({message: "User not found"})
    }
    console.log(user)
    return res.status(200).json(user);
}

<<<<<<< Updated upstream
// updated 3/16
async function getUserByEmail(req, res) {
    console.log("users.control")
    const objEmail = ObjectId.createFromHexString(req.email);
=======

async function getUserByEmail(email) {
    const isValid = helperFun.validateEmail(email);
    if(!email || !isValid) throw 'input email is invalid';
>>>>>>> Stashed changes
    const userCollection = await usersController();
    const user = await userCollection.findOne({email: objEmail});
    if (!user) {
        res.status(400).send({message: "User not found"})
    }
    console.log(user)
    return res.status(200).json(user);
}

// update 3/16
async function getUserIdByEmail(req, res) {
    console.log("user.control")
    const objEmail = ObjectId.createFromHexString(req.email);
    const userCollection = await usersController();
    const user = await userCollection.findOne({email: objEmail});
    if (!user) {
        res.status(400).send({message: "User not found"})
    }
    console.log(user)
    return res.status(200).json(user._id);
}

// update 3/16  req:id  res:??
async function updateUserEmail(req, res) {
    console.log("users.control")
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await usersController();
    const user = await userCollection.findOne({_id: objId});
    if(!user) {
        res.status(400).send({message: "User not found"})
    }
    const isValid = helperFun.validateEmail(req.email);
    if(!isValid) {
        res.status(400).send({message: "Invalid email is provided"})
    }
    let yserToBeUpdated = await getUserById(req.id);
    userToBeUpdated.email = req.email;
    const userCollection = await usersController();
    const objId = Object.createFromHexString(id);
    const updateInfo = await userCollection.updateOne({_id: objId}, {$set: userToBeUpdated});
    if (updateInfo.modifiedCount === 0) {
        res.status(400).send({message: "Update failed"})
    }
    console.log(user)
    return res.status(200).json(user._id);
    
    // if(!id || typeof id !== 'string')  throw 'invalid id is provided';
    // const isValid = helperFun.validateEmail(email);
    // if(!email || !isValid) throw 'input email is invalid';

    // let userToBeUpdated = await getUserById(id);
    // userToBeUpdated.email = email;
    // const userCollection = await usersController();
    // const objId = Object.createFromHexString(id);
    // const updateInfo = await userCollection.updateOne({_id: objId}, {$set: userToBeUpdated});
    // if (updateInfo.modifiedCount === 0) throw 'Update failed';
    // return await getUserById(id);

}


module.exports = {
    getUserById,
    getUserByEmail,
    getUserIdByEmail,
    updateUserEmail,
};