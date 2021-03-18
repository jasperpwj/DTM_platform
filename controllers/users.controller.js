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

// updated 3/16
async function getUserByEmail(req, res) {
    console.log("users.control")
    const objEmail = ObjectId.createFromHexString(req.email);
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
    return res.status(200).send({message: "User account updated successfully."})
}

async function resetPassword(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await users();
    let updateInfo = {};
    if(req.body.password) {
        const hashPwd = await bcrypt.hash(req.body.password, 5);
        updateInfo.password = hashPwd;
    }
    if(JSON.stringify(updateInfo) !== '{}') {
        const updatedStatus = await userCollection.updateOne({_id: objId}, {$set:updateInfo});
        if(updatedStatus.modifiedCount === 0) throw "fail to reset password";
    }
    return res.status(200).send({message: "User password reset successfully."})
}


// update 3/16  req:id  res:??
// async function updateUserEmail(req, res) {
//     console.log("users.control")
//     const objId = ObjectId.createFromHexString(req.id);
//     const userCollection = await usersController();
//     const user = await userCollection.findOne({_id: objId});
//     if(!user) {
//         res.status(400).send({message: "User not found"})
//     }
//     const isValid = helperFun.validateEmail(req.email);
//     if(!isValid) {
//         res.status(400).send({message: "Invalid email is provided"})
//     }
//     let yserToBeUpdated = await getUserById(req.id);
//     userToBeUpdated.email = req.email;
//     const userCollection = await usersController();
//     const objId = Object.createFromHexString(id);
//     const updateInfo = await userCollection.updateOne({_id: objId}, {$set: userToBeUpdated});
//     if (updateInfo.modifiedCount === 0) {
//         res.status(400).send({message: "Update failed"})
//     }
//     console.log(user)
//     return res.status(200).json(user._id);

    // let userToBeUpdated = await getUserById(id);
    // userToBeUpdated.email = email;
    // const userCollection = await usersController();
    // const objId = Object.createFromHexString(id);
    // const updateInfo = await userCollection.updateOne({_id: objId}, {$set: userToBeUpdated});
    // if (updateInfo.modifiedCount === 0) throw 'Update failed';
    // return await getUserById(id);

// }


module.exports = {
    getUserById,
    getUserByEmail,
    getUserIdByEmail,
    resetPassword,
    // updateUserEmail,
};