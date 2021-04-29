import React, {useState, useEffect} from 'react';
import ProjectMenuBar from "./ProjectMenuBar";
import {Grid,Typography,  makeStyles, Table, TableBody, TableRow, TableHead,TableCell} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation} from "@devexpress/dx-react-chart";
import {
    VictoryChart, VictoryGroup, VictoryVoronoiContainer,VictoryTooltip,VictoryLine,VictoryScatter,
    VictoryZoomContainer,VictoryBrushContainer,VictoryAxis,VictoryPie,VictoryLegend,VictoryBar, VictoryTheme,
} from 'victory';
const projectService = require("../services/projects.service");
const containerService = require("../services/container.service");
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        height: "100%",
        minWidth: 1400,
        minHeight: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
    },
    dashboardArea: {
        height: "100%",
        width: "100%",
        margin: theme.spacing(0,0,0,0),
        backgroundColor: '#eeeeee',
    },
    paper: {
        padding: theme.spacing(1,1,3,1),
    },
    column1: {
        minWidth: 300,
    },
    col1row1: {
        margin: theme.spacing(0,0,1,0),

    },
    column2: {
        minWidth: 450,
    },
    col2row1: {
        margin: theme.spacing(0,0,1,0),
    },
    col2row3:{
        margin: theme.spacing(0,0,1,0),
    },
    column3: {
        minWidth: 300,
    },
    col3row1: {
    },
    }));

export default function ProjectDashboard(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [containers, setContainers] = useState("");
    const [projectSummary, setProjectSummary] = useState({});
    const [progress, setProgress] = useState({});
    const [timeSeries, setTimeSeries] = useState({});
    const [pieChart, setPieChart] = useState({});
    const [radarData, setRadarData] = useState({});
    const [loading, setLoading] = useState(true);
    const processRadarData = (data) => {
        const makeDataArray = (d) => {
            return Object.keys(d).map(key => {
                return {x: key, y: d[key]};
            });
        };
        let newRadarData = {};
        for(let [key, value] of Object.entries(data)) {
            newRadarData[key] = makeDataArray(value);
        }
        return newRadarData;
    };

    useEffect(() => {
        projectService.getProjectContent(projectId)
            .then(res => {
                setProjectContent(res);
            })
            .catch(err => {console.log(err)})
    },[projectId]);

    useEffect(() => {
        containerService.getContainers(projectId)
            .then(res => {
                if(Object.entries(res).length !== 0) {
                    setContainers(res);
                }
        });
        projectService.getProjectDashboardContent(projectId)
            .then(res => {
                console.log(res.dashboardContent.radarChart);
                setProjectSummary(res.dashboardContent.summary);
                setProgress(res.dashboardContent.progress);
                setTimeSeries(res.dashboardContent.timeSeries);
                setPieChart(res.dashboardContent.pieChart);
                setRadarData(processRadarData(res.dashboardContent.radarChart));
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, [projectId]);
    const container_data = [];
    for (let key in containers) {
        container_data.push({x: containers[key].containerName, y:containers[key].taskCount})
    }
    //Brush and Zoom Chart in Col2 Row2
    const [zoomDomain, setZoomDomain] = useState({x:[ new Date(2020,1,1), new Date()]});
    const handleZoom = (domain) => {
        setZoomDomain(domain);
    };

    if(loading) {
        return (
            <div>
                <Typography>Loading...</Typography>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
                <Grid container direction='row' justify='space-evenly' className={classes.dashboardArea} spacing={1}>
                    <Grid container item xs={3} direction='column' id='column1' className={classes.column1} >
                        <Grid container item className={classes.col1row1} style={{flexGrow: 1}}>
                            <Paper style={{width: "100%"}}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><Typography variant='h6' component='h3'>Project Summary</Typography></TableCell>
                                            <TableCell> </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Project Manager:</TableCell>
                                            <TableCell>{projectSummary && projectSummary.projectManager}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Teams:</TableCell>
                                            <TableCell>{projectSummary && projectSummary.teams.toString()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Clients:</TableCell>
                                            <TableCell>{projectSummary && projectSummary.clients.toString()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Initial Date:</TableCell>
                                            <TableCell>{projectSummary && projectSummary.initialDate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Last Updated Time:</TableCell>
                                            <TableCell>{projectSummary && projectSummary.lastUpdateTime}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Duration</TableCell>
                                            <TableCell>{projectSummary && projectSummary.duration}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Status:</TableCell>
                                            <TableCell>{projectSummary && projectSummary.status}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid container item className={classes.col1row2} style={{flexGrow: 1}}>
                            <Paper elevation={0} className={classes.paper} style={{width: "100%"}}>
                                <Chart data={container_data} >
                                    <ArgumentAxis />
                                    <ValueAxis max={7}/>
                                    <BarSeries
                                        valueField="y"
                                        argumentField="x"
                                        color="#CCCCFF"
                                        barWidth={0.8}
                                    />
                                    <Title text="Tasks in containers" />
                                    <Animation />
                                </Chart>
                                <b>Container Name</b>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} direction='column' id='column2' className={classes.column2}>
                        <Grid container item className={classes.col2row1}>
                            <Paper style={{width: "100%", padding: 8}}>
                                <Typography align='left'>Project Progress</Typography>
                                <VictoryChart height={150}
                                              containerComponent={<VictoryVoronoiContainer/>}
                                >
                                    <VictoryLegend x={100} y={120}
                                                   orientation="horizontal"
                                                   gutter={20}
                                                   data={[
                                                       { name: "Active", symbol: { fill: "gold"} },
                                                       { name: "Completed", symbol: { fill: "tomato" } },
                                                       { name: "Issue", symbol: { fill: "blue" } }
                                                   ]}
                                    />
                                    {progress && Object.entries(progress).map(([key, value]) => {
                                        return (
                                            <VictoryGroup
                                                key={key}
                                                color={(key=== "active")?"gold": ((key === "completed")? "tomato":"blue")}
                                                labels={({ datum }) => `count: ${datum.y}`}
                                                labelComponent={
                                                    <VictoryTooltip
                                                        style={{ fontSize: 8 }}
                                                    />
                                                }
                                                data={[
                                                    { x: "Sun", y: value["Sun"]?value["Sun"]: 0},
                                                    { x: "Mon", y: value["Mon"]?value["Mon"]: 0 },
                                                    { x: "Tue", y: value["Tue"]?value["Tue"]: 0 },
                                                    { x: "Wed", y: value["Wen"]?value["Wen"]: 0 },
                                                    { x: "Thur", y: value["Thur"]?value["Thur"]: 0 },
                                                    { x: "Fri", y: value["Fri"]?value["Fri"]: 0 },
                                                    { x: "Sat", y: value["Sat"]? value["Sat"]: 0 }
                                                ]}
                                            >
                                                <VictoryLine/>
                                                <VictoryScatter
                                                    size={({ active }) => active ? 6 : 3}
                                                />
                                            </VictoryGroup>
                                        )
                                    })}
                                </VictoryChart>
                            </Paper>
                        </Grid>
                        <Grid container item >
                            <Paper style={{width: '100%', padding: 8}}>
                                <Typography align='left'>Tasks Time Series</Typography>
                                <VictoryChart height={200} scale={{ x: "time" }}
                                              containerComponent={
                                                  <VictoryZoomContainer
                                                      zoomDimension="x"
                                                      zoomDomain={zoomDomain}
                                                      onZoomDomainChange={handleZoom}
                                                  />
                                              }
                                >
                                    <VictoryLegend x={100} y={175}
                                                   orientation="horizontal"
                                                   gutter={20}
                                                   data={[
                                                       { name: "Active", symbol: { fill: "gold"} },
                                                       { name: "Completed", symbol: { fill: "tomato" } },
                                                       { name: "Issue", symbol: { fill: "blue" } }
                                                   ]}
                                    />
                                    {timeSeries && Object.entries(timeSeries).map(([key, value]) => {
                                        let maxCount = 0;
                                        let data = Object.entries(value).map(([date, count]) => {
                                            maxCount =Math.max(count, maxCount);
                                            return {x: new Date(date), y: count}});
                                        return (
                                            <VictoryLine
                                                key={key}
                                                style={{
                                                    data: { stroke: (key=== "active")?"gold": ((key === "completed")? "tomato":"blue") }
                                                }}
                                                domain={{y: [0, maxCount]}}
                                                data={data}
                                                x="x"
                                                y="y"
                                            />
                                        )
                                    })}
                                </VictoryChart>
                            </Paper>
                        </Grid>
                        <Grid container item className={classes.col2row3}>
                            <Paper style={{width: "100%", padding: 8}}>
                                <VictoryChart
                                    padding={{ top: 10, left: 50, right: 50, bottom: 30 }}
                                    height={80} scale={{ x: "time" }}
                                    containerComponent={
                                        <VictoryBrushContainer
                                            brushDimension="x"
                                            brushDomain={zoomDomain}
                                            onBrushDomainChange={handleZoom}
                                        />
                                    }
                                >
                                    <VictoryAxis
                                        tickFormat={(x) => new Date(x).getMonth()+ '/'+ new Date(x).getFullYear()}
                                    />
                                    {timeSeries && Object.entries(timeSeries).map(([key, value]) => {
                                        let data = Object.entries(value).map(([date, count]) => {return {x: new Date(date), y: count}});
                                        return (
                                            <VictoryLine
                                                key={key}
                                                style={{
                                                    data: { stroke: (key=== "active")?"gold": ((key === "completed")? "tomato":"blue") }
                                                }}
                                                data={data}
                                                x="x"
                                                y="y"
                                            />
                                        )
                                    })}
                                </VictoryChart>
                            </Paper>
                        </Grid>
                        <Grid container item className={classes.col2row4}>
                            <Paper style={{width: "100%", padding: 8}}>
                                <Typography align='left'>Tasks Summary</Typography>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <VictoryPie
                                            startAngle={90}
                                            endAngle={450}
                                            data={[
                                                { x: 1, y: (pieChart.active && pieChart.active)?pieChart.active: 1, label: "Active" },
                                                { x: 2, y: (pieChart.completed && pieChart.completed)?pieChart.completed: 1, label: "Completed" },
                                                { x: 3, y: (pieChart.issue && pieChart.issue)?pieChart.issue: 1, label: "Issues" }
                                            ]}
                                            colorScale={["#009688", "#29b6f6", "#ffc107"]}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} justify='center' alignItems='center'>
                                        <Paper>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Color</TableCell>
                                                        <TableCell>Tasks</TableCell>
                                                        <TableCell>Number</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell style={{backgroundColor: "#009688"}}> </TableCell>
                                                        <TableCell>Active</TableCell>
                                                        <TableCell>{pieChart.active && pieChart.active}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{backgroundColor: "#29b6f6"}}> </TableCell>
                                                        <TableCell>Completed</TableCell>
                                                        <TableCell>{pieChart.completed && pieChart.completed}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{backgroundColor: "#ffc107"}}> </TableCell>
                                                        <TableCell>Issues</TableCell>
                                                        <TableCell>{pieChart.issue && pieChart.issue}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={3} direction='column' id='column2' className={classes.column3}>
                        {radarData && Object.entries(radarData).map(([key, value]) => {
                            console.log(value)
                            return (
                                <Grid container item className={classes.col3row1} style={{flexGrow: 1}} key={key}>
                                    <Paper key={key} style={{width:"100%", padding: 20}}>
                                        <Typography align='left'>Tasks: {key}</Typography>
                                        <VictoryChart
                                            theme={VictoryTheme.material}
                                        >
                                            <VictoryGroup
                                                          offset={0}
                                                          style={{ data: { width: 10 } }}
                                                          colorScale={["tomato", "orange", "gold", "blue", "grey", "green"]}
                                                          animate={{
                                                              duration: 500,
                                                              onLoad: { duration: 100 }
                                                          }}
                                                          // color={(key=== "active")?"gold": ((key === "completed")? "tomato":"blue")}
                                            >
                                                {value && value.map(set => {
                                                    return (
                                                        <VictoryBar
                                                            data={[set]}
                                                        />
                                                        )
                                                })}

                                            </VictoryGroup>
                                        </VictoryChart>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        )
    }
}