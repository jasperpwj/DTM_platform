import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:4000/tasks/";

function createTask(taskInfo) {
    return axios.post(API_URL + taskInfo.containerId + "/createTask", taskInfo, {headers: authHeader()})
        .then(res => {
        return res;
    })
}

function editTask(taskInfo) {
    return axios.patch(API_URL + taskInfo.containerId + "/editTask", taskInfo, {headers: authHeader()})
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