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

export {
    getUserProfile,
    updateUserAccount,
};