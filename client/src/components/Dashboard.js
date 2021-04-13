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

const projectService = require("../services/projects.service");
const taskService = require("../services/tasks.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),

    },

    paper: {
        marginLeft: '5%',
    }
}));
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
export default function DashboardPage() {
    const classes = useStyles();
    
    const [tasks, setTasks] = useState([]);
    const projectIdList = [];
    const [openProject, setOpenProjects] = useState([]);
    useEffect(()=> {
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
        taskService.getAllTasksByProjectIdList(projectIdList)
            .then(res => {setTasks(res);})
            .catch(err => {console.log(err)})
    },[projectIdList.length]);
    
    let issue = 0;
    let completed = 0;
    let active = 0;

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

    const data = [
        { region: 'active', val: active },
        { region: 'completed', val: completed },
        { region: 'issue', val: issue },
    ];


    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Paper elevation={0} className={classes.paper}>
                        <Chart
                            data={data}
                        >
                        <PieSeries
                            valueField="val"
                            argumentField="region"
                            innerRadius={0.5}
                        />
                        <Title
                            text="All Tasks in your account"
                        />
                        <Animation />
                        </Chart>
                        <br></br>
                        <AdjustIcon fontSize = "small" style={{ color: green[400] }} /> Issue
                        <AdjustIcon fontSize = "small" style={{ color: orange[600] }} /> completed
                        <AdjustIcon fontSize = "small" style={{ color: blue[500] }} /> active
                    </Paper>
                    
                </div>
            </main>
        </div>
    )
}