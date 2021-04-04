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
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import AddContainer from "./AddContainer";
import EditContainer from "./EditContainer";
import DeleteContainer from "./DeleteContainer";
const containerService = require("../services/container.service");



const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
        // height: '100vh',
    },
    title: {
        // padding: theme.spacing(1),
        // backgroundColor: "lightblue",
        padding: theme.spacing(2,2,1,2),
        spacing: theme.spacing(1),
        backgroundColor: "white",
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    taskCount: {
        width: theme.spacing(2) + 4,
        height: theme.spacing(2) + 4,
        backgroundColor: '#bf360c',
    },
    button_group: {
        backgroundColor: "white",
        padding: theme.spacing(0,0,0,1),
    },
    containersArea: {
        overflow: 'auto',
        height: '100vh',
        marginLeft: theme.spacing(2),
        // backgroundColor: 'lightgrey',
    },
    containerArea: {
        height: '100vh',
        width: 350,
        margin: theme.spacing(1,1,2,1),
        borderRadius: '8px',
        border: "2px solid #bdbdbd",
    },
    containerHead: {
        padding: theme.spacing(0,0,0,1),
        height: 50,
        borderRadius: '8px 8px 0 0',
        backgroundColor: '#eeeeee',
    },
    containerTitle: {
        marginLeft: theme.spacing(1),
    },
    containerContent: {
        height: 'calc(100% - 53px)',
        width: 'calc(100%)',
        borderRadius: '0 0 8px 8px',
    },
    task: {
        userSelect: 'none',
        padding: theme.spacing(3),
        margin: theme.spacing(0,1,2,1),
        minHeight: '50px',
        borderRadius: '8px',
        border: "2px solid #e0e0e0",
    },
    emptyCard: {
        height: 250,
        width: 450,
        marginTop: 50,
        borderRadius: '8px 8px 8px 8px',
        border: "2px dashed black",
        // backgroundColor: "#f5f5f5",
    },
    test: {
        backgroundColor: "lightblue",
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
const emptyCard = (projectId) => {
    return (
        <React.Fragment>
            <Typography >You don' have any container yet. Create one!</Typography>
            <AddContainer  value={projectId}/>
        </React.Fragment>
    )
}



export default function Project(props) {
    const [project, setProject] = useState("");
    const [containers, setContainers] = useState("");
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [projectId, setProjectId] = useState(props.location.state.projectId);


    const handleOpenContainerMore= (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        console.log("run")
        containerService.getContainers(projectId).then(res => {
            if(Object.entries(res).length === 0) {
                setEmptyContainer(true);
            } else {
                setEmptyContainer(false);
                setContainers(res);
            }
        })
    }, [projectId])


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

            <Grid container justify="center" className={classes.dragDropArea}>
                <Grid item xs={12}>
                    <AddContainer value={projectId} />
                    <Typography >
                        Page
                    </Typography>
                </Grid>
                {(emptyContainer)? (<Grid container item className={classes.emptyCard} justify='center' alignContent='center'
                >{emptyCard(projectId)}</Grid>): (
                    <DragDropContext onDragEnd={result => onDragEnd(result,containers, setContainers)} >
                        <Grid container direction='row'  wrap='nowrap'className={classes.containersArea}>
                            {containers && Object.entries(containers).map(([id, container]) => {
                                return (
                                    <Grid key={id} item className={classes.containerArea} >
                                        <Grid container  alignItems='center' className={classes.containerHead}>
                                            <Avatar className={classes.taskCount} variant='circular'><Typography variant='body2'>{container.taskCount}</Typography></Avatar>
                                            <Grid container item xs alignItems='center'className={classes.containerTitle}>
                                                <Typography variant='subtitle1'>{container.containerName}</Typography>
                                            </Grid>
                                            <Grid container item xs={3} alignItems='flex-end' justify='flex-end'>
                                                <IconButton size='small'><AddIcon/></IconButton>
                                                <IconButton size='small' onClick={handleOpenContainerMore}><MoreVertIcon/></IconButton>
                                                <Menu
                                                    id={container._id}
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    {/*<MenuItem onClick={handleClose}>Edit Container</MenuItem>*/}
                                                    <EditContainer value={container._id}/>
                                                    {/*<MenuItem onClick={handleClose}>Delete Container</MenuItem>*/}
                                                    <DeleteContainer value={container._id} projectId={projectId}/>
                                                </Menu>
                                            </Grid>
                                        </Grid>
                                        <Droppable droppableId={container._id} key={container._id}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <Grid
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            backgroundColor: snapshot.isDraggingOver ? "#cfd8dc": "#eeeeee",
                                                        }}
                                                        className={classes.containerContent}
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
                                                                                    backgroundColor: snapshot.isDragging ? 'lightblue' : '#ffecb3',
                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                                className={classes.task}
                                                                            >
                                                                                {task.content}
                                                                            </div>
                                                                        )
                                                                    }}
                                                                </Draggable>
                                                            )
                                                        })}
                                                        {provided.placeholder}
                                                    </Grid>
                                                )
                                            }}
                                        </Droppable>
                                    </Grid>
                                )
                            })}
                        </Grid>

                    </DragDropContext>
                )}

            </Grid>
        </div>
    )
}
