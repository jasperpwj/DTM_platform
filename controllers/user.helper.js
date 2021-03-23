const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;

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


module.exports = {
    validateEmail,
    getUserByEmail,
};