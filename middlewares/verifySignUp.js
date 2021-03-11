const mongoCollection = require("../config/mongoCollections");
const usersController = mongoCollection.users;
const helperFun = require("../controllers/helper.controller");

checkExistedUsernameOrEmail = async (req, res, next) => {
    //check existed username
    const userCollection = await usersController();
    try {
        const user = await userCollection.findOne({username: req.body.username});
        if(user) {
            res.status(400).send({message:"Username is already registered"});
            return;
        }
    } catch (error) {
        console.log({message:error});
    }
    // check existed email
    try {
        const validEmail = await helperFun.validateEmail(req.body.email);
        if(! validEmail) {
            res.status(400).send({message:"Email format is invalid"});
        }
        const user = await userCollection.findOne({email: req.body.email});
        if(user) {
            res.status(400).send({message:"Email is already registered"});
            return;
        }
    } catch (error) {
        console.log({message:error});
    }
    next();
};

module.exports = {
    checkExistedUsernameOrEmail,
};