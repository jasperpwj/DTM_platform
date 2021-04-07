import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:4000/tasks/";

function createTask(containerId, title, content) {
    let newTask = {
        containerId: containerId,
        title: title,
        content: content,
    };
    return axios.post(API_URL + containerId + "/createTask", newTask, {headers: authHeader()})
        .then(res => {
        return res;
    })
}

function editTask(containerId, title, content) {
    let newTask = {
        containerId: containerId,
        title: title,
        content: content,
    };
    return axios.patch(API_URL + containerId + "/editTask", newTask, {headers: authHeader()})
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

function deleteTask(containerId, taskId) {
    let taskToBeDeleted = {
        containerId: containerId,
        taskId: taskId,
    };
    return axios.post(API_URL + "/deleteTask", taskToBeDeleted, {headers:authHeader()})
        .then( res=> {
        return res;
    })
}


export {
    createTask,
    editTask,
    updateDraggingTask,
    deleteTask,
}