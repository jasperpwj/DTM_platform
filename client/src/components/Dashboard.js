import React, {useState, useEffect} from 'react';
import {makeStyles, TableContainer} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {VictoryPie} from 'victory';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
    font3: {
        fontFamily: 'Raleway',
        color: "tomato",
    },
    emptyRow: {
        height: 300,
    }
}));

export default function DashboardPage() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [isEmptyProject, setIsEmptyProject] = useState(false);

    useEffect(()=> {
        projectService.getDashboardData().then(res => {
            if(!(res.data.length)) {
                setIsEmptyProject(true);
                setData(res.data);
            } else {
                setData(res.data);
            }
        })
    }, []);
    console.log(isEmptyProject)
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="table">
                    {(!isEmptyProject)?(
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
                        ): (
                            <TableBody>
                                <TableRow className={classes.emptyRow}>
                                    <TableCell align="center">
                                        <Typography variant="h5">You don't have any Project.</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}