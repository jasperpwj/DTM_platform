const dbConnection = require("./config/mongoConnection");
const data = require("./controllers");
const tasks = data.tasks;

async function main() {
    const db = await dbConnection();
    // await db.dropDatabase();

    await tasks.addTask("task1", "editor1", "1", "blablabla", "c1");

    // await db.serverConfig.close();
}

main();
