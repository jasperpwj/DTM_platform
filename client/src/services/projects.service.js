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
function getProjectContent(projectId) {
    let projectObj = {
        projectId: projectId,
    };
    return axios.post(API_URL + "/getProjectContent", projectObj, {headers:authHeader()})
        .then(res => {return res.data});
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
function editProjectInfo(project) {
    return axios.patch(API_URL + "edit_project", project, {headers: authHeader()}).then(res => {
        return res;
    })
}
function getProjectMember(project) {
    return axios.post(API_URL + "project_member", project, {headers:authHeader()}).then(res => {
        return res;
    })
}
function getSearchProjects(searchWords) {
    return axios.post(API_URL + "search_projects", searchWords, {headers:authHeader()}).then(res => {
        return res;
    })
}
function getDashboardData() {
    return axios.get(API_URL + "project_data", {headers:authHeader()}).then(res => {
        return res;
    })
}
function deleteProjectMember(projectMember) {
    return axios.patch(API_URL + "delete_project_member", projectMember, {headers:authHeader()}).then(res => {
        return res;
    })
}
function getUserIdentity(projectId) {
    let projectObj = {
        projectId: projectId,
    };
    return axios.post(API_URL + "get_user_identity", projectObj, {headers:authHeader()})
        .then(res => {return res.data});
}

function getProjectDashboardContent(projectId) {
    let projectObj = {
        projectId: projectId,
    };
    return axios.post(API_URL + 'project-dashboard-content', projectObj, {headers:authHeader()})
        .then(res => {return res.data})
}

export {
    createProject,
    getOpenProjects,
    getClosedProjects,
    changeProjectStatus,
    editProjectInfo,
    getProjectMember,
    getSearchProjects,
    getProjectContent,
    getDashboardData,
    deleteProjectMember,
    getUserIdentity,
    getProjectDashboardContent,
}