import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from "@material-ui/core/IconButton";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from "@material-ui/core/AppBar";
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
        // height: '100vh',
    },
    title: {
        padding: theme.spacing(1),
        backgroundColor: "lightblue",
        // spacing: theme.spacing(0,0,0,1),
        padding: theme.spacing(2,2,1,2),
        spacing: theme.spacing(1),
        backgroundColor: "white",
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),

    },
    button_group: {
        backgroundColor: "white",
        padding: theme.spacing(0,0,0,1),
    },
    dragDropArea: {
        height: '100vh',
        display: 'flex',
        // backgroundColor: 'lightgrey',
    },
    containersArea: {
        overflow: 'auto',
    },
    containerArea: {
        // backgroundColor: "lightgreen",
        height: '100vh',
        margin: theme.spacing(1),

    },
    containerHead: {
        backgroundColor: "lightgreen",
        padding: theme.spacing(0,0,0,1),
        height: 50,
    },
    container: {
        // backgroundColor: "lightgreen",
        height: '94vh',
        // margin: theme.spacing(1),
        width: 320,
        padding:theme.spacing(1),

    },
    test: {
        backgroundColor: "lightgreen",
        padding: theme.spacing(0,0,0,1),
    },
}));

//mock project data
const taskF = [
    {id: "001", content: "first task"},
    {id: "002", content: "second task"},
    {id: "003", content: "thrid task"},
    {id: "004", content: "fourth task"},
];

const columns = {
    "101": {
        _id: "101",
        name: "Todo",
        tasks: taskF,
    },
    "102": {
        _id: "102",
        name: "onProgress",
        tasks: [{id: "005", content: "fifth task"},]
    },
    "103": {
        _id: "103",
        name: "onProgress2",
        tasks: [{id: "006", content: "sixth task"},]
    },
    "104": {
        _id: "104",
        name: "onProgress3",
        tasks: []
    },
};



// drop and drag effect function
const onDragEnd = (result, containers, setContainers) => {
    if(!result.destination) return;
    const {source, destination} = result;
    if(source.droppableId !== destination.droppableId) {
        const sourceContainer = containers[source.droppableId];
        const destContainer = containers[destination.droppableId];
        const sourceTasks = [...sourceContainer.tasks];
        const destTasks = [...destContainer.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);
        setContainers({
            ...containers,
            [source.droppableId]: {
                ...sourceContainer,
                tasks: sourceTasks
            },
            [destination.droppableId]: {
                ...destContainer,
                tasks: destTasks
            }
        })
    } else {
        const container = containers[source.droppableId];
        const copiedTasks = [...container.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        setContainers({
            ...containers,
            [source.droppableId]: {
                ...container,
                tasks: copiedTasks
            }
        })
    }
}



export default function Project(props) {
    const [containers, setContainers] = useState(columns);
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container className={classes.title}>
                <Grid item xs>
                    <Typography align="left" variant='h6'>
                        Project Name
                    </Typography>
                </Grid>
                <Grid container item xs justify="flex-end" spacing={1}>
                    <Grid item>
                        <AvatarGroup spacing={2}>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                        </AvatarGroup>
                    </Grid>
                    <Grid item>
                        <IconButton size="small"><PersonAddIcon/></IconButton>
                    </Grid>
                    <Grid item>
                        <Button size="small" startIcon={<SettingsIcon/>}>Setting</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.button_group}>
                <Button size="small">Project</Button>
                <Button size="small">Tasks</Button>
                <Button size="small">Dashboard</Button>
                <Button size="small">Timeline</Button>
            </Grid>
            <Divider/>
            <Grid container justify="flex-start" className={classes.dragDropArea}>
                <Grid item xs={12}>
                    <Typography >
                        Page
                    </Typography>
                </Grid>
                <DragDropContext onDragEnd={result => onDragEnd(result,containers, setContainers)} >
                    <Grid container direction='row' alignItems='center' justify='flex-start' wrap='nowrap'className={classes.containersArea}>
                        {containers && Object.entries(containers).map(([id, container]) => {
                            return (
                                <Grid key={id} item className={classes.containerArea} >
                                    <Grid container justify='space-between' alignItems='center' className={classes.containerHead}>
                                        <Typography align='left'>{container.name}</Typography>
                                        <Grid item>
                                            <IconButton size='small'><AddIcon/></IconButton>
                                            <IconButton size='small'><MoreVertIcon/></IconButton>
                                        </Grid>

                                    </Grid>

                                    <Droppable droppableId={container._id} key={container._id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: snapshot.isDraggingOver ? "#cfd8dc": "#eeeeee",
                                                    }}
                                                    className={classes.container}
                                                >
                                                    {container.tasks && container.tasks.map((task, index) => {
                                                        return (
                                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: 16,
                                                                                margin: '0 0 8px 0',
                                                                                minHeight: '50px',
                                                                                backgroundColor: snapshot.isDragging ? 'lightblue' : '#ffecb3',
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {task.content}
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </Grid>
                            )
                        })}
                    </Grid>

                </DragDropContext>

            </Grid>
        </div>
    )
}
