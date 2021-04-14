import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import { green, orange,blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import AdjustIcon from '@material-ui/icons/Adjust';
import { Animation } from '@devexpress/dx-react-chart';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {VictoryPie} from 'victory';
import ReactDOM from 'react-dom';

const projectService = require("../services/projects.service");
const taskService = require("../services/tasks.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        },
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),

    },

    paper: {
        padding: 20,
        marginLeft: '5%',
        height: 200,
        width: 500,
    },

    chart: {
        outerRadius: 10
    },
}));
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function DashboardPage() {
    const classes = useStyles();
    
    const [tasks, setTasks] = useState([]);
    const projectIdList = [];
    const [openProject, setOpenProjects] = useState([]);
    useEffect(()=> {
        console.log(1)
        projectService.getOpenProjects().then(res => {
            if(!(res.data.length)) {
                setOpenProjects(res.data);
            } else {
                setOpenProjects(res.data);
            }
        })
    }, []);

    for (let i = 0; i < openProject.length; i++) {
        projectIdList.push(openProject[i]._id)
    }

    useEffect(() => {
        console.log(2)
        taskService.getAllTasksByProjectIdList(projectIdList)
            .then(res => {setTasks(res);})
            .catch(err => {console.log(err)})
    },[projectIdList.length]);
    
    let issue = 0;
    let completed = 0;
    let active = 0;
    console.log(tasks)
    // count tasks
    if (tasks.length !== 0) {
        for (let i = 0; i < tasks.length; i++) {
            // console.log(tasks[i])
            if (tasks[i].status === "active") {
                active += 1                
            } else if (tasks[i].status === "issue") {
                issue += 1
            } else if (tasks[i].status === "completed") {
                completed += 1
            }

        }
    }
    // console.log(issue)
    // console.log(completed)
    // console.log(active)

    const data2 = [
        { x: "activeTask", y: active },
        { x: "completedTask", y: completed },
        { x: "issue", y: issue },
    ];

    console.log(openProject)
    const projectData = [
        {projectName: '', initial_Date: '', lastUpdatedTime:'', status: ''}
    ]
    for (let i = 0; i < openProject.length; i++) {
        projectData.push({projectName:openProject[i].projectName, initial_Date:openProject[i].initial_Date, lastUpdatedTime:openProject[i].lastUpdatedTime, status: openProject[i].status});
    }
    // console.log(projectData && projectData[0].projectName)


    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={5}>
                        <Grid item align='left'>
                            <Paper elevation={20} className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2}>
                                Project Name: {projectData && projectData[0].projectName} <br></br>
                                Initial Date: {projectData && projectData[0].initial_Date} <br></br>
                                LastUpdated Time：{projectData && projectData[0].lastUpdatedTime} <br></br>
                                Project Status: {projectData && projectData[0].status} <br></br>
                                Tasks:
                                <VictoryPie
                                    cornerRadius={({ datum }) => datum.y * 2}
                                    innerRadius={20}
                                    padAngle={({ datum }) => datum.y}
                                    colorScale={["#FFCCCC", "#FF99CC", "#CCCCFF"]}
                                    data={data2}
                                    height={250}
                                />
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item align='left'>
                            <Paper elevation={20} className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2}>
                                Project Name: {projectData[0].projectName} <br></br>
                                Initial Date: {projectData[0].initial_Date} <br></br>
                                LastUpdated Time：{projectData[0].lastUpdatedTime} <br></br>
                                Project Status: {projectData[0].status} <br></br>
                                Tasks:
                                <VictoryPie
                                    cornerRadius={({ datum }) => datum.y * 2}
                                    innerRadius={20}
                                    padAngle={({ datum }) => datum.y}
                                    colorScale={["#FFCCCC", "#FF99CC", "#CCCCFF"]}
                                    data={data2}
                                    height={250}
                                />
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    )
}