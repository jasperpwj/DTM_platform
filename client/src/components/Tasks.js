import React, {useState, useEffect} from 'react';
import ProjectMenuBar from "./ProjectMenuBar";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const projectService = require("../services/projects.service");
const taskService = require("../services/tasks.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        minWidth: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
        // height: '100vh',
    },
}));

export default function Tasks(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [tasks, setTasks] = useState(null);
    useEffect(() => {
        projectService.getProjectContent(projectId)
            .then(res => {
                setProjectContent(res);
            })
            .catch(err => {console.log(err)})
    },[projectId]);





    return (
        <div className={classes.root}>
            <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
            <Typography>Here</Typography>
        </div>
    )
}