import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {VictoryPie} from 'victory';
const projectService = require("../services/projects.service");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
    },

    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(6),
        width: 500,
        height: 200,
        marginLeft: "7%",
    },
}));
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function DashboardPage() {
    const classes = useStyles();
    const [data, setData] = useState();
    useEffect(()=> {
        projectService.getDashboardData().then(res => {
            if(!(res.data.length)) {
                setData(res.data);
            } else {
                setData(res.data);
            }
        })
    }, []);

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                {data && data.map((project) => {
                    return (
                        <Paper elevation={20} className={classes.paper}>
                            <Grid item xs container spacing={1}>
                                <Grid item xs>
                                    <Typography variant="body1">
                                        Project Name: {project.projectName}
                                    </Typography>
                                    <Typography variant="body1">
                                        Initial Date: {project.initial_Date}
                                    </Typography>
                                    <Typography variant="body1">
                                        Updated Date：{project.lastUpdateTime}
                                    </Typography>
                                    <Typography variant="body1">
                                        Project Status: {project.status}
                                    </Typography>
                                    <Typography variant="body1">
                                        Project Visibility: {project.visibility}
                                    </Typography>
                                    <Typography variant="body1">
                                        Tasks:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <VictoryPie
                                        cornerRadius={({ datum }) => datum.y * 2}
                                        innerRadius={20}
                                        padAngle={({ datum }) => datum.y}
                                        colorScale={["#FFCCCC", "#FF99CC", "#CCCCFF"]}
                                        data={[
                                            { x: "activeTask", y: project.activeTask, label: " "},
                                            { x: "completedTask", y: project.completedTask, label: " " },
                                            { x: "issue", y: project.issue, label: " " },
                                        ]}
                                        height={280}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })}
            </main>
        </div>
    )
}