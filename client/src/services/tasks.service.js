import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:4000/tasks/";

function createTask(taskInfo) {
    return axios.post(API_URL + taskInfo.containerId + "/createTask", taskInfo, {headers: authHeader()}).then(res => {
        return res;
    })
}

function editTask(taskInfo) {
    return axios.patch(API_URL + taskInfo.containerId + "/editTask", taskInfo, {headers: authHeader()}).then(res => {
        return res;
    })
}


export {
    createTask,
    editTask,
}