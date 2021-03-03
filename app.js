const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");
//define another port to connect react frontend and backend mongodb database
const port = process.env.PORT || 4000;
//connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connect to mongodb database successfully'))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use("*", (req, res) => {
    res.status(404).json({error: "Page Not Found"})
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});