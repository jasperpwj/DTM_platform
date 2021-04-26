import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {VictoryPie} from 'victory';
import Link from "@material-ui/core/Link";
const projectService = require("../services/projects.service");


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        minWidth: 900,
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(9),
        flexWrap: "wrap",
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        width: 590,
        marginLeft: 100,
        textAlign: "left",
    },
    taskFont: {
        fontFamily: 'Raleway',
        marginLeft: theme.spacing(1),
    },
    activeTask: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        backgroundColor: "gold",
    },
    completedTask: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        backgroundColor: "orange",
    },
    Issue: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        backgroundColor: "tomato",
    },
    task: {
        margin: theme.spacing(1,0,1,0)
    },
    emptyContainer: {
        width: 500,
        height: 240,
        margin: theme.spacing(15,0,0,0),
        borderRadius: '8px 8px 8px 8px',
        border: "2px dashed black",
    }
}));

export default function DashboardPage() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(()=> {
        projectService.getDashboardData().then(res => {
            setData(res.data);
            console.log(res.data)
        })
    }, []);

    return (
        <div className={classes.root}>
            {(data && data.length)? (
                <main className={classes.content}>
                    <Grid container justify='center'>
                        {data && data.map((project) => {
                            return (
                                <Paper elevation={20}  key={project._id} className={classes.paper}>
                                    <Grid container direction="row" justify="flex-start">
                                        <Grid item xs={5}>
                                            <Typography variant="h6" component='h2'>
                                                Project Name: {project.projectName}
                                            </Typography>
                                            <Typography variant="body1">
                                                Initial Date: {project.initial_Date}
                                            </Typography>
                                            <Typography variant="body1">
                                                Updated Date：{project.lastUpdateTime}
                                            </Typography>
                                            <Typography variant="body1">
                                                Status: {project.status}
                                            </Typography>
                                            <Typography variant="body1">
                                                Visibility: {project.visibility}
                                            </Typography>

                                            <Grid container direction='row' className={classes.task}>
                                                <Avatar className={classes.activeTask}> </Avatar>
                                                <Typography variant="body1" className={classes.taskFont}>
                                                    Active Task: {project.activeTask}
                                                </Typography>
                                            </Grid>
                                            <Grid container direction='row' className={classes.task}>
                                                <Avatar className={classes.completedTask}> </Avatar>
                                                <Typography variant="body1" className={classes.taskFont}>
                                                    Completed Task: {project.completedTask}
                                                </Typography>
                                            </Grid>
                                            <Grid container direction='row' className={classes.task}>
                                                <Avatar className={classes.Issue}> </Avatar>
                                                <Typography variant="body1" className={classes.taskFont}>
                                                    Issue: {project.issue}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Link
                                                href={`/projects/${project._id}`}
                                            >
                                                <VictoryPie
                                                    cornerRadius={({ datum }) => datum.y * 2}
                                                    innerRadius={40}
                                                    padAngle={({ datum }) => datum.y*2}
                                                    colorScale={["gold", "orange", "tomato"]}
                                                    data={[
                                                        { x: "activeTask", y: (project.activeTask)? project.activeTask: 1, label: `Active: ${project.activeTask}`},
                                                        { x: "completedTask", y: (project.completedTask)? project.completedTask: 1, label: `Completed: ${project.completedTask}` },
                                                        { x: "issue", y: (project.issue)? project.issue: 1, label: `Issue: ${project.issue}`},
                                                    ]}
                                                    height={290}
                                                />
                                            </Link>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            )
                        })}
                    </Grid>
                </main>
            ):(
                <Grid container item justify='center' alignContent='center'>
                    <Grid container justify='center' alignContent='center' className={classes.emptyContainer}>
                        <Typography variant="h5" align='center'>You have no project yet.</Typography>
                    </Grid>
                </Grid>
            )}

        </div>
    )
}
