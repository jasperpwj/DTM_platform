const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;
const { ObjectId } = require("mongodb");

async function validateEmail(email) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regExp.test(email);
}
async function getUserByEmail(email) {
    const isValid = validateEmail(email);
    if(!email || !isValid) throw 'input email is invalid';
    const userCollection = await users();
    const user = await userCollection.findOne({email: email});
    if (!user) throw 'No user Found';
    return user;
}
async function getUserNameByUserId(userId) {
    let userInputId = userId;
    if(!ObjectId.isValid(userInputId) || typeof userInputId === 'string'){
        userInputId = ObjectId.createFromHexString(userInputId);
    }
    const usersCollection = await users();
    let user = await usersCollection.findOne({_id: userInputId});
    if(!user) throw `Cannot find user by id: ${userInputId}`;
    return user.firstName + " " + user.lastName;
}

module.exports = {
    validateEmail,
    getUserByEmail,
    getUserNameByUserId,
};