import axios from "axios";

function login(email, password) {
    return axios
        .post('http://localhost:4000/auth/login', {email, password})
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data;
        })
}

function logout() {
    localStorage.removeItem("user");
}

function getCurrentUser() {
    return (JSON.parse(localStorage.getItem("user")))
}

export {
    login,
    logout,
    getCurrentUser,
};