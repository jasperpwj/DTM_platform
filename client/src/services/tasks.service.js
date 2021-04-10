import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:4000/tasks/";

function createTask(projectId, containerId, title, content) {
    let newTask = {
        projectId: projectId,
        containerId: containerId,
        title: title,
        content: content,
    };
    return axios.post(API_URL + containerId + "/createTask", newTask, {headers: authHeader()})
        .then(res => {
        return res;
    })
}
function getTaskById(taskId) {
    return axios.get(API_URL + "/getTask/" + taskId, {headers:authHeader()})
        .then(res => {
        return res.data;
    })
}
function editTask(taskId, title, content) {
    let taskObj = {
        taskId: taskId,
        title: title,
        content: content,
    };
    return axios.patch(API_URL + taskId + "/editTask", taskObj, {headers: authHeader()})
        .then(res => {
        return res;
    })
}
function updateDraggingTask(sourceContainerId, destContainerId, sourceTaskId, sourceTaskIndex, destTaskIndex) {
    let taskToBeUpdated = {
        sourceContainerId: sourceContainerId,
        destContainerId: destContainerId,
        sourceTaskId: sourceTaskId,
        sourceTaskIndex: sourceTaskIndex,
        destTaskIndex: destTaskIndex,
    };
    return axios.patch(API_URL + "/updateDraggingTask", taskToBeUpdated, {headers: authHeader()})
        .then( res => {
        return res;
    })
}
function deleteTask(projectId, containerId, taskId) {
    let taskToBeDeleted = {
        projectId: projectId,
        containerId: containerId,
        taskId: taskId,
    };
    return axios.post(API_URL + "/deleteTask", taskToBeDeleted, {headers:authHeader()})
        .then( res=> {
        return res;
    })
}
function completeTask(containerId, taskId) {
    let taskToBeComplete = {
        containerId: containerId,
        taskId: taskId,
    };
    return axios.post(API_URL + "/completeTask", taskToBeComplete, {headers:authHeader()})
        .then(res => {return res})
}


export {
    createTask,
    getTaskById,
    editTask,
    updateDraggingTask,
    deleteTask,
    completeTask,
}