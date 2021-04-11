import React, {useState, useEffect} from 'react';
import ProjectMenuBar from "./ProjectMenuBar";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
const projectService = require("../services/projects.service");
const containerService = require("../services/container.service");
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        minWidth: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
    },
    paper: {
        marginLeft: '1%',
    }
}));

export default function ProjectDashboard(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [containers, setContainers] = useState("");


    useEffect(() => {
        projectService.getProjectContent(projectId)
            .then(res => {
                setProjectContent(res);
            })
            .catch(err => {console.log(err)})
    },[projectId]);

    useEffect(() => {
        containerService.getContainers(projectId).then(res => {
            if(Object.entries(res).length === 0) {
                setEmptyContainer(true);
            } else {
                setEmptyContainer(false);
                setContainers(res);
            }
        })
    }, [projectId]);

    const container_data = [];
    for (var key in containers) {

        container_data.push({containerName: containers[key].containerName, taskCount:containers[key].taskCount})
    }

    


    return (
        <div className={classes.root}>
            <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
            
            <Paper elevation={0} className={classes.paper}>
                <Chart data={container_data} >
                    <ArgumentAxis />
                        <ValueAxis max={2} />
                        <BarSeries 
                            name="Silver Medals" 
                            valueField="taskCount" 
                            argumentField="containerName" 
                            color="#3F51B5"/>
                        <Title text="Project Dashboard" />
                    <Animation />
                </Chart>
                <b>ContainerName </b>
            </Paper>
            
        </div>
    )
}