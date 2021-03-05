const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");



// check if the email is registered before
async function checkUserExist(email) {
    const userCollection = await users();
    const lowercaseEmail = email.toLowerCase();
    const user = await userCollection.findOne({email: lowercaseEmail});
    return user == null;
}

async function validateEmail(email) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regExp.test(email);
}

async function addUser(firstName, lastName, email, password) {
    if(!firstName || typeof firstName !== 'string') throw 'first name is empty or invalid input type';
    if(!lastName || typeof lastName !== 'string') throw 'last name is empty or invalid input type';
    if(!email || typeof email !== 'string') throw 'email is empty or invalid input type';
    if(!password || typeof password !== 'string') throw 'password is empty or invalid input type';
    const isEmailValid = await validateEmail(email);
    const isUserExisted = await checkUserExist(email);
    if(!isEmailValid) throw 'email format is invalid';
    if(!isUserExisted) throw 'email is already registered';
    const hasdedPwd = await bcrypt.hash(password, 5);
    const userCollection = await users();
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hasdedPwd,
        projects: [],
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if(insertInfo.insertedCount === 0) throw 'fail to add the new user in the database';
    return await getUserById(insertInfo.insertedId.toString())
}

async function getUserById(id) {
    if(!id || typeof id !== 'string')  throw 'invalid id is provided';
    const objId = ObjectId.createFromHexString(id);
    const userCollection = await users();
    const user = await userCollection.findOne({_id: objId});
    if(!user) throw 'No user found';
    return user;
}

async function getUserByEmail(email) {
    const isValid = validateEmail(email);
    if(!email || !isValid) throw 'input email is invalid';
    const userCollection = await users();
    const user = await userCollection.findOne({email: email});
    if(!user) throw 'No user found';
    return user;
}

async function getUserIdByEmail(email) {
    const user = getUserByEmail(email);
    return user._id;
}


module.exports = {
    addUser,
    getUserById,
    getUserByEmail,
    getUserIdByEmail,
};