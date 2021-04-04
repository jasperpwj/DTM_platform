import axios from "axios";
import authHeader from "./authHeader"

const API_URL = "http://localhost:4000/users/";

function getUserProfile() {
    return axios.get(API_URL + "account", {headers: authHeader()}).then(res => {
        return res;
    })
}

function updateUserAccount(user) {
    return axios.patch(API_URL + "edit_account", user, {headers: authHeader()}).then(res => {
        return res;
    })
}

function resetPassword(password) {
    return axios.patch(API_URL + "reset_password", password, {headers: authHeader()}).then(res => {
        return res;
    })
}

function uploadHead(head) {
    return axios.patch(API_URL + "reset_password", head, {headers: authHeader()}).then(res => {
        return res;
    })
}

export {
    getUserProfile,
    updateUserAccount,
    resetPassword,
    uploadHead,
};