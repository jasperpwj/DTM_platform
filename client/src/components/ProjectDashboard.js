import React, {useState, useEffect} from 'react';
import ProjectMenuBar from "./ProjectMenuBar";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {VictoryChart, VictoryTheme,VictoryBar} from 'victory';

const projectService = require("../services/projects.service");
const containerService = require("../services/container.service");
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        minWidth: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
    },
    paper: {
        marginLeft: '1%',
        padding: 20,
        height: 400
    }
}));

export default function ProjectDashboard(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [containers, setContainers] = useState("");


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

    const container_data = [];
    for (var key in containers) {

        container_data.push({x: containers[key].containerName, y:containers[key].taskCount})
    }

    return (
        <div className={classes.root}>
            <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
            
            <Paper elevation={0} className={classes.paper}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    height={200}
                    >
                    <VictoryBar
                        barRatio={0.8}
                        cornerRadius={{ topLeft: ({ datum }) => datum.x * 4 }}
                        barWidth={({ index }) => index * 2 + 8}
                        style={{ data: { fill: "#CCCCFF" } }}
                        data={container_data}
                        height={10}
                    />
                </VictoryChart>
                <b>ContainerName </b>
                
            </Paper>
            
        </div>
    )
}