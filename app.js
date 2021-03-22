const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const projectsRoutes = require("./routes/projects.routes");
const mongoose = require("mongoose");
const cors = require("cors");

//define another port to connect react frontend and backend mongodb database
const port = process.env.PORT || 4000;

const corsOptions = {origin: "http://localhost:3000"};
app.use(cors(corsOptions));
//connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connect to mongodb database successfully'))
    .catch(err => {
        console.error("Connection error", err);
        process.exit()
    });

// alternative way to connect port 3000
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www.form.urlencoded
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "x-access-token, Origin, Content-Type, Accept");
    next();
});

// set up routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectsRoutes);

app.use("*", (req, res) => {
    res.status(404).json({error: "Page Not Found"})
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});