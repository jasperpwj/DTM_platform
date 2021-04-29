import React, {useState, useEffect} from 'react';
import ProjectMenuBar from "./ProjectMenuBar";
import {Grid, makeStyles} from "@material-ui/core";
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
    paper1: {
        marginLeft: '2%',
        padding: 20,
        height: 100,
        width: 300,
        textAlign: "left",

    },
    paper2: {
        marginLeft: '1%',
        padding: 20,
        height: 200,
        width: 1200,
    }
}));

export default function ProjectDashboard(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [containers, setContainers] = useState("");
    const [author, setAuthor] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);

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

    useEffect(() => {
        projectService.getProjectMember(projectId).then(res => {
            console.log(1)
            setAuthor(res.data.owner);
            setDevelopers(res.data.developers);
            setClients(res.data.clients);
        })
    }, []);
    console.log(author)
    console.log(developers)
    console.log(clients)
    const container_data = [];
    for (var key in containers) {
        container_data.push({x: containers[key].containerName, y:containers[key].taskCount})
    }
    return (
        <div className={classes.root}>
            <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
            <Grid container direction="row" justify="flex-start">
                <Grid item>
                    <Paper elevation={0} className={classes.paper1}>
                        Project Member:
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={0} className={classes.paper1}>
                        Project Member:
                    </Paper>
                </Grid>
            <Paper elevation={0} className={classes.paper2}>
                <Chart data={container_data} >
                    <ArgumentAxis />
                    <ValueAxis max={7} />
                    <BarSeries valueField="y" argumentField="x" color="#CCCCFF" barWidth={0.8}/>
                    <Title text="Tasks in container" />
                    <Animation />
                    </Chart>
                    <b>ContainerName </b>
            </Paper>
                
            </Grid>
        </div>
    )
}