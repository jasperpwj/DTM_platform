const express = require("express");
const router = express.Router();
const data = require("../data");
const axios = require("axios");
const bcrypt = require("bcrypt");
const xss = require("xss");

require('dotenv').config();


router.post("/sign-up", async(req, res) => {
    try {
        let info = {
            first: req.body.firstName,
            last: req.body.lastName,
            email: req.body.email,
            pwd: req.body.password
        };
        const newUser = await data.users.addUser(xss(info.first), xss(info.last), xss(info.email), xss(info.pwd));
        console.log(newUser)
        await res.json(newUser);
    } catch(e) {
        console.log({error: e});
        res.status(500).json(e);
    }
});

router.post("/login", async(req, res) => {
    try {
        let user = await data.users.getUserByEmail(req.body.email);
        let isPwdMatched = await bcrypt.compare(req.body.password, user.password);
        if(isPwdMatched) {
            await res.json(user);
        } else {
            res.status(500).json("Error: Incorrect username or password");
        }
    } catch(e) {
        console.log({error: e});
        res.status(500).json(e);
    }
});

module.exports = router;
