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
    return axios.get(API_URL + "getTask/" + taskId, {headers:authHeader()})
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
    return axios.patch(API_URL + "updateDraggingTask", taskToBeUpdated, {headers: authHeader()})
        .then( res => {
        return res;
    })
}
function deleteTask(projectId, taskId) {
    let taskToBeDeleted = {
        projectId: projectId,
        taskId: taskId,
    };
    return axios.post(API_URL + "deleteTask", taskToBeDeleted, {headers:authHeader()})
        .then( res=> {
        return res;
    })
}
function completeTask(taskId) {
    let taskToBeComplete = {
        taskId: taskId,
    };
    return axios.post(API_URL + "completeTask", taskToBeComplete, {headers:authHeader()})
        .then(res => {return res})
}

function getTasksByProjectId(projectId) {
    return axios.get(API_URL + "getTasks/" + projectId, {headers: authHeader()})
        .then( res => {
        return res.data;
    })
}

function getCompletedTasksByProjectId(projectId) {
    return axios.get(API_URL + "getCompletedTasks/" + projectId, {headers: authHeader()})
        .then( res => {
            return res.data;
        })
}
function getIssuesByProjectId(projectId) {
    return axios.get(API_URL + "getIssues/" + projectId, {headers: authHeader()})
        .then( res => {
            return res.data;
        })
}

function turnTaskIntoIssue(taskId) {
    let taskObj = {
        taskId: taskId
    };
    return axios.post(API_URL + "turnIntoIssue", taskObj, {headers: authHeader()})
        .then(res => {return res})
}

export {
    createTask,
    getTaskById,
    editTask,
    updateDraggingTask,
    deleteTask,
    completeTask,
    getTasksByProjectId,
    getCompletedTasksByProjectId,
    getIssuesByProjectId,
    turnTaskIntoIssue,
}