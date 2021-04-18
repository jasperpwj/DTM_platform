const mongoCollection = require("../config/mongoCollections");
const projects = mongoCollection.projects;
const tasks = mongoCollection.tasks;

const { ObjectId } = require("mongodb");
const projectHelper = require("./projects.helper");

async function addProject(req, res) {
    if (!req.body.projectName || typeof req.body.projectName !== 'string') throw 'name of project is empty or invalid input type';
    const projectCollection = await projects();
    let newProject = {
        projectName: req.body.projectName,
        status: "open",  // open: open, closed: closed or completed
        initial_Date: new Date().toLocaleString(),
        lastUpdateTime: new Date().toLocaleDateString(),
        description: (req.body.description) ? req.body.description : "No description",
        visibility: req.body.visibility, // public or private
        owner: req.id,  // owner is the string of email
        developers: [],
        clients: [],
        containers: [],
        tasks: []
    };
    const insertInfo = await projectCollection.insertOne(newProject);
    if (insertInfo.insertedCount === 0) throw "fail to add new project in the database";
    //add projectId to user
    const projectId = insertInfo.insertedId;
    const additionResult = await projectHelper.addProjectIdToUser(req.id, projectId);
    if (!additionResult) throw 'Fail to add project Id to the user';
    return res.send({ message: "Project is created successfully" });
}

async function getOpenProjects(req, res) {
    const projectList = await projectHelper.getProjectListByUserId(req.id);
    if (!projectList.length) {
        res.status(200).send(projectList);
    } else {
        const projectCollection = await projects();
        let openProjects = [];
        for (let project of projectList) {
            const openProject = await projectCollection.findOne({ _id: project._id, status: "open" });
            if (openProject !== null) {
                openProjects.push(openProject);
            }
        }
        res.status(200).json(openProjects);
    }
}

async function getClosedProjects(req, res) {
    const projectList = await projectHelper.getProjectListByUserId(req.id);
    if (!projectList.length) {
        res.status(200).send(projectList);
    } else {
        const projectCollection = await projects();
        let closedProjects = [];
        for (let project of projectList) {
            const closedProject = await projectCollection.findOne({ _id: project._id, status: "closed" });
            if (closedProject !== null) {
                closedProjects.push(closedProject);
            }
        }
        res.status(200).json(closedProjects);
    }
}

async function changeProjectStatus(req, res) {
    const projectCollection = await projects();
    const projectMongoId = await ObjectId.createFromHexString(req.body.projectId);
    const changeStatus = projectCollection.updateOne({ _id: projectMongoId }, { $set: { status: req.body.operation } });
    if (changeStatus.modifiedCount === 0) throw "Fail to change project status";
    res.status(200).json({ message: "Project Status changes successfully." })
}

async function getProjectById(req, res) {
    // if (!id || typeof id !== "string") throw "invalid id is provided";
    const objId = ObjectId.createFromHexString(req.id);
    const projectCollection = await projects();
    const project = await projectCollection.findOne({ _id: objId });
    if (!project) {
        res.status(400).send({ message: "Project not found" })
    }
    return res.status(200).json(project)
}

async function editProject(req, res) {
    const objId = ObjectId.createFromHexString(req.body.projectId);
    const projectCollection = await projects();

    let editInfo = {};
    if (req.body.projectName) {
        editInfo.projectName = req.body.projectName;
    }
    if (req.body.description) {
        editInfo.description = req.body.description;
    }
    if (req.body.status) {
        editInfo.status = req.body.status;
    }
    editInfo.lastUpdateTime = new Date().toLocaleDateString();
    if (JSON.stringify(editInfo) !== '{}') {
        const editStatus = await projectCollection.updateOne({ _id: objId }, { $set: editInfo });
        if (editStatus.modifiedCount === 0) throw "Failed to edit project's info";
    }

    return res.status(200).send({ message: "Edition of project info succeeded!" })
}

async function getProjectMember(req, res) {
    const objId = ObjectId.createFromHexString(req.body.projectId);
    const projectCollection = await projects();
    const project = await projectCollection.findOne({ _id: objId });
    if (!project) {
        res.status(400).send({ message: "Project not found" });
    }
    const projectOwner = await projectHelper.getUserById(project.owner);
    const ownerName = projectOwner.username;
    const developerNameList = [];
    const clientNameList = [];
    if (project.developers.length !== 0) {
        for (let developerId of project.developers) {
            let developer = await projectHelper.getUserById(developerId);
            if (developer) {
                developerNameList.push(developer.username);
            }
            else {
                res.status(400).send({ message: "Developer not found" });
            }
        }
    }
    if (project.clients.length !== 0) {
        for (let clientId of project.clients) {
            let client = await projectHelper.getUserById(clientId);
            if (client) {
                clientNameList.push(client.username);
            }
            else {
                res.status(400).send({ message: "Client not found" });
            }
        }
    }
    return res.status(200).json({
        owner: ownerName,
        developers: developerNameList,
        clients: clientNameList
    });
}

async function getSearchProjects(req, res) {
    // console.log(req.body) // input
    // console.log(req.id); // user id
    const projectId = await projectHelper.getProjectListByUserId(req.id);
    const projects = [];
    for (let i = 0; i < projectId.length; i++) {
        projects.push(await projectHelper.getProjectById(projectId[i].toString()));
    }
    const projectSearchedList = [];
    if (projects.length !== 0) {
        for (i = 0; i < projects.length; i++) {
            if (projects[i].projectName.includes(req.body.inPut)) {
                projectSearchedList.push(projects[i]);
            }
        }
        if (projectSearchedList.length !== 0) {
            res.status(200).send(projectSearchedList);
        }
    } else {
        return null;
    }
}

async function getProjectContent(req, res) {
    const projectsCollection = await projects();
    const project = await projectsCollection.findOne({ _id: ObjectId.createFromHexString(req.body.projectId) });
    if (!project) throw `Fail to find the project with id: ${req.body.projectId}`;
    let returnInfo = {
        projectName: project.projectName,
        description: project.description,
    };
    return res.status(200).json(returnInfo);
}

async function getDashboardData(req, res) {
    const projectList = await projectHelper.getProjectListByUserId(req.id);
    if (!projectList.length) {
        res.status(200).send(projectList);
    } else {
        const projectCollection = await projects();
        let projectsData = [];
        let data = [];
        for (let project of projectList) {
            const allProject = await projectCollection.findOne({ _id: project._id });
            if (allProject !== null) {
                projectsData.push(allProject);
            }
        }
        for (let i = 0; i < projectsData.length; i++) {
            let activeTask = 0;
            let completedTask = 0;
            let issue = 0;
            if (projectsData[i].tasks.length !== 0) {
                for (let j = 0; j < projectsData[i].tasks.length; j++) {
                    const task_id = projectsData[i].tasks[j]
                    const tasksCollection = await tasks();
                    let taskObj = await tasksCollection.findOne({ _id: task_id });
                    if (taskObj.status == 'active') {
                        activeTask += 1;
                    } else if (taskObj.status == 'completed') {
                        completedTask += 1;
                    } else if (taskObj.status === "issue") {
                        issue += 1;
                    }
                }
            }
            data.push({
                projectName: projectsData[i].projectName,
                status: projectsData[i].status,
                initial_Date: projectsData[i].initial_Date.split(",")[0],
                lastUpdateTime: projectsData[i].lastUpdateTime,
                visibility: projectsData[i].visibility,
                activeTask: activeTask,
                completedTask: completedTask,
                issue: issue,
            })
        }
        res.status(200).json(data);
    }
}

async function deleteProjectMember(req, res) {
    const objId = ObjectId.createFromHexString(req.body.projectId);
    const projectCollection = await projects();
    const project = await projectCollection.findOne({ _id: objId });
    if (!project) {
        res.status(400).send({ message: "Project not found" })
    }
    const targetUser = await projectHelper.getUserByUsername(req.body.username);

    let deleteResult = false;
    if (project.developers) {
        for (let developer of project.developers) {
            if (targetUser._id.toString() === developer) {
                let deleteUserFromProject = await projectCollection.updateOne({ _id: objId }, { $pull: { developers: developer } });
                if (deleteUserFromProject.modifiedCount === 0) res.status(400).send({ message: "Fail to remove invitation id from user" });
                deleteResult = await projectHelper.removeProjectFromUser(req.body.projectId, targetUser._id);
                break;
            }
        }
    }
    if (project.clients) {
        for (let client of project.clients) {
            if (targetUser._id.toString() === client) {
                let deleteUserFromProject = await projectCollection.updateOne({ _id: objId }, { $pull: { clients: client } });
                if (deleteUserFromProject.modifiedCount === 0) res.status(400).send({ message: "Fail to remove invitation id from user" });
                deleteResult = await projectHelper.removeProjectFromUser(req.body.projectId, targetUser._id);
                break;
            }
        }
    }
    return res.status(200).json({ memberDelete: deleteResult});
}

module.exports = {
    addProject,
    getOpenProjects,
    getClosedProjects,
    changeProjectStatus,
    getProjectById,
    editProject,
    getProjectMember,
    getSearchProjects,
    getProjectContent,
    getDashboardData,
    deleteProjectMember,
};
