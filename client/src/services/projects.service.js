import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:4000/projects/";

function createProject(project) {
    return axios.post(API_URL + "create_project", project, {headers:authHeader()}).then(res =>{
        return res;
    })
}

function getOpenProjects() {
    return axios.get(API_URL + "open_projects", {headers:authHeader()}).then(res => {
        return res;
    })
}

function getClosedProjects() {
    return axios.get(API_URL + "closed_projects", {headers:authHeader()}).then(res => {
        return res;
    })
}

function changeProjectStatus(operation) {
    return axios.patch(API_URL + "change_project_status", operation, {headers:authHeader()}).then(res => {
        return res;
    })
}

export {
    createProject,
    getOpenProjects,
    getClosedProjects,
    changeProjectStatus,
}