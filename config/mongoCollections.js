const dbConnection = require("./mongoConnection");

/* define the reference to each collection */
const getCollection = collection => {
    let _col = undefined;
    return async() => {
        if(!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col;
    }
};

/* list the database collection */
module.exports = {
    users: getCollection("users"),
};