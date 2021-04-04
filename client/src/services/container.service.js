import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:4000/container/";

function addContainer(containerInfo) {
    return axios.post(API_URL + containerInfo.projectId + "/addContainer", containerInfo, {headers: authHeader()}).then(res => {
        return res;
    })
}
function getContainers(projectId) {
    return axios.get(API_URL + projectId + "/getContainers", {headers: authHeader()}).then(res => {
        return res.data;
    })
}
function editContainer(containerInfo) {
    return axios.patch(API_URL + containerInfo.containerId + "/editContainer", containerInfo, {headers: authHeader()}).then(res => {
        return res;
    })
}

function deleteContainer(containerInfo) {
    return axios.delete(API_URL + containerInfo.containerId + "/deleteContainer", {headers:authHeader(),data: containerInfo}).then(res => {
        return res;
    })
}

export {
    addContainer,
    getContainers,
    editContainer,
    deleteContainer,
}