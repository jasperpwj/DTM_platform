const config = require("../config/auth.config");
const mongoCollection = require("../config/mongoCollections");
const usersController = mongoCollection.users;
const usersFun = require("./users.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
    if(!req.body.username || typeof req.body.username !== 'string') throw 'username is empty or invalid input type';
    if(!req.body.firstName || typeof req.body.firstName !== 'string') throw 'first name is empty or invalid input type';
    if(!req.body.lastName || typeof req.body.lastName !== 'string') throw 'last name is empty or invalid input type';
    if(!req.body.email || typeof req.body.email !== 'string') throw 'email is empty or invalid input type';
    if(!req.body.password || typeof req.body.password !== 'string') throw 'password is empty or invalid input type';
    const userCollection = await usersController();
    const hashPwd = await bcrypt.hash(req.body.password, 5);
    let newUser = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPwd,
        projects: [],
    };
    console.log("auth.control");
    console.log(newUser)
    const insertInfo = await userCollection.insertOne(newUser);
    if(insertInfo.insertedCount === 0) throw 'fail to add the new user in the database';
    return res.send({message: "User is registered successfully"});
}

async function login(req, res) {
    try {
        let user = await usersFun.getUserByEmail(req.body.email);
        if(!user) {
            return await res.status(404).send({message: "User not found"})
        }
        let isPwdMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isPwdMatched) {
            return await res.status(401).send({
                accessToken: null,
                message: "invalid password"
            })
        }
        let token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400}); // expire in 24 hours
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        })
    } catch(e) {
        console.log({error: e});
        res.status(500).send({message: e});
    }
};

module.exports = {
    signUp,
    login,
};