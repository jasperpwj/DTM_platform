const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;
const {ObjectId} = require("mongodb");

async function uploadHead(req, res) {
    const objId = ObjectId.createFromHexString(req.id);
    const userCollection = await users();
    let updateInfo = {};
    if (req.body.head) {
        updateInfo.head = req.body.head;
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
    uploadHead,
};