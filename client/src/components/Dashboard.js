import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
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

const example_data = [
    { region: 'Complete tasks', val: 10 },
    { region: 'Issue', val: 5 },
    { region: 'Active tasks', val: 15 },
  ];

export default function DashboardPage() {
    const classes = useStyles();
    const navBarInfo = {
        title: "Account"
    };
    const [tasks, setTasks] = useState(null);

    const [openProject, setOpenProjects] = useState([]);
    const [isEmptyProject, setIsEmptyProject] = useState(false);
    useEffect(()=> {
        projectService.getOpenProjects().then(res => {
            if(!(res.data.length)) {
                setIsEmptyProject(true);
                setOpenProjects(res.data);
            } else {
                setIsEmptyProject(false);
                setOpenProjects(res.data);
            }
        })
    }, []);
    console.log(openProject)
    

    // useEffect(() => {
    //     taskService.getTasksByProjectId(projectId)
    //         .then(res => {setTasks(res);})
    //         .catch(err => {console.log(err)})
    // },[projectId]);

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Paper elevation={0} className={classes.paper}>
                    <Chart
          data={example_data}
        >
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.5}
          />
          <Title
            text="All Tasks"
          />
          <Animation />
        </Chart>
                    </Paper>
                    
                </div>
            </main>
        </div>
    )
}