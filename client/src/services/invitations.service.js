import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:4000/invitations/";


function getInvitations() {
    return axios.get(API_URL + "invitations", {headers:authHeader()}).then(res => {
        return res;
    })
}

function dealWithInvitation(invitationInfo) {
    return axios.post(API_URL + "deal_invitation", invitationInfo, {headers:authHeader()}).then(res => {
        return res;
    })
}

function sendInvitation(invitationInfo) {
    return axios.post(API_URL + "send_invitation", invitationInfo, {headers:authHeader()}).then(res => {
        return res;
    })
}

export {
    getInvitations,
    dealWithInvitation,
    sendInvitation
}