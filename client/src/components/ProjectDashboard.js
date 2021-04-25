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
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const projectService = require("../services/projects.service");
const containerService = require("../services/container.service");
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        height: "100%",
        minWidth: 1150,
        minHeight: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
    },
<<<<<<< Updated upstream
    paper1: {
        marginLeft: '1%',
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
=======
    dashboardArea: {
        height: "100%",
        width: "100%",
        margin: theme.spacing(0,0,0,0),
        backgroundColor: 'lightyellow',
    },
    paper: {
        marginLeft: '1%',
        padding: 10,

    },
    column1: {
        backgroundColor: "lightblue",
        minWidth: 300,
        // height: "100%",
        margin: theme.spacing(1,0,1,1),
    },
    col1row1: {
        backgroundColor: "lightblue",
        margin: theme.spacing(0,0,2,0),
    },
    col1row2: {
    },
    column2: {
        backgroundColor: "lightblue",
        minWidth: 500,
        margin: theme.spacing(1,0,1,1),
    },
    col2row1: {
        backgroundColor: "lightblue",
        margin: theme.spacing(0,0,2,0),
    },
    col2row2: {
        backgroundColor: "lightgreen",
    },
    column3: {
        backgroundColor: "lightblue",
        minWidth: 300,
        margin: theme.spacing(1,1,1,1),
    },
    col3row1: {
        backgroundColor: "lightblue",
        margin: theme.spacing(0,0,2,0),
    },
    col3row2: {
        backgroundColor: "lightgreen",
    },
    test: {
        width: 200,
        height: 300,
>>>>>>> Stashed changes
    }
}));

export default function ProjectDashboard(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [containers, setContainers] = useState("");
<<<<<<< Updated upstream
    const [author, setAuthor] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <Grid container direction="row" justify="flex-start">
                <Grid item>
                    <Paper elevation={10} className={classes.paper1}>
                        Project Member:
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={10} className={classes.paper1}>
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
=======
            <Grid container direction='row' justify='space-center' className={classes.dashboardArea} spacing={1}>
                <Grid container item xs={3} direction='column' id='column1' className={classes.column1} >
                    <Grid item className={classes.col1row1}>
                        <Paper className={classes.test} />
                    </Grid>
                    <Grid item className={classes.col1row2}>
                        <Paper elevation={0} className={classes.paper}>
                            <Chart data={container_data}>
                                <ArgumentAxis />
                                <ValueAxis max={7}/>
                                <BarSeries
                                    valueField="y"
                                    argumentField="x"
                                    color="#CCCCFF"
                                    barWidth={0.8}
                                />
                                <Title text="Tasks in container" />
                                <Animation />
                            </Chart>
                            <b>ContainerName </b>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item xs direction='column' id='column2' className={classes.column2}>
                    <Grid item className={classes.col2row1}>
                        <Paper className={classes.test} />
                    </Grid>
                    <Grid item className={classes.col2row1}>
                        <Paper className={classes.test} />
                    </Grid>
                </Grid>
                <Grid container item xs={3} direction='column' id='column2' className={classes.column3}>
                    <Grid item className={classes.col3row1}>
                        <Paper className={classes.test} />
                    </Grid>
                    <Grid item className={classes.col3row2}>
                        <Paper className={classes.test} />
                    </Grid>
                </Grid>
            </Grid>

            
>>>>>>> Stashed changes
        </div>
    )
}