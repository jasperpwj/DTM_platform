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
        display: "flex",
        // flexGrow: 1,
        flexWrap: "wrap",
        minWidth: 900,
    },

    content: {
        flexGrow: 1,
        marginTop: theme.spacing(6),
        flexWrap: "wrap",
    },

   
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        width: 590,
        maxheight: 200,
        marginLeft: "7%",
        textAlign: "left",
    },
    font1: {
        fontFamily: 'Raleway',
        color: "gold",
    },
    font2: {
        fontFamily: 'Raleway',
        color: "orange",
    },
    font3: {
        fontFamily: 'Raleway',
        color: "tomato",
    }
}));
let theme = createMuiTheme(

);
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
                <Grid container>
                {data && data.map((project) => {
                    return (
                        <Paper elevation={20} className={classes.paper}>
                            <Grid container direction="row" justify="flex-start">
                                <Grid item> 
                                    <Typography variant="h6" > 
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
                                    <Typography variant="body1" className={classes.font1}>
                                        Active Task: {project.activeTask}
                                    </Typography>
                                    <Typography variant="body1" className={classes.font2}>
                                        Completed Task: {project.completedTask}
                                    </Typography>
                                    <Typography variant="body1" className={classes.font3}>
                                        Issue: {project.issue}
                                    </Typography>
                                </Grid>
                                <Grid item>                                
                                    <VictoryPie
                                        cornerRadius={({ datum }) => datum.y * 2}
                                        innerRadius={40}
                                        padAngle={({ datum }) => datum.y*2}
                                        colorScale={["gold", "orange", "tomato"]}
                                        data={[
                                            { x: "activeTask", y: project.activeTask, label: " "},
                                            { x: "completedTask", y: project.completedTask, label: " " },
                                            { x: "issue", y: project.issue, label: " " },
                                        ]}
                                        height={290}
                                    />
                                </Grid>
                                
                            </Grid>
                        </Paper>
                    )
                })}
                </Grid>
            </main>
        </div>
    )
}