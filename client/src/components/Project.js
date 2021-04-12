import React, {useState, useEffect, useRef} from 'react';
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
import Menu from '@material-ui/core/Menu';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import AddContainer from "./AddContainer";
import EditContainer from "./EditContainer";
import DeleteContainer from "./DeleteContainer";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import ProjectMembers from "./ProjectMembers";
import AddMember from "./AddMember";
const containerService = require("../services/container.service");
const taskService = require("../services/tasks.service");

const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
        // height: '100vh',
    },
    title: {
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
        padding: theme.spacing(1),
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
        height: '100%',
    },
    taskForm: {
        backgroundColor: 'lightyellow',
        borderRadius: '8px',
        border: "2px solid #e0e0e0",
    }
}));

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
};

const emptyCard = (projectId) => {
    return (
        <React.Fragment>
            <Typography >You don' have any container yet. Create one!</Typography>
            <AddContainer  value={projectId}/>
        </React.Fragment>
    )
};

export default function Project(props) {
    const pathArray = props.location.pathname.split('/');
    const [containers, setContainers] = useState("");
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [projectId, setProjectId] = useState(pathArray[pathArray.length - 1]);
    const [targetContainerId, setTargetContainerId] = useState(null);
    const [openTask, setOpenTask] = useState(false);
    const [emptyInput, setEmptyInput] = useState(true);
    const containerRef = useRef(anchorEl);
    const open = Boolean(anchorEl);
    const tapRef = useRef(anchorEl);
    const initTaskInfo = Object.freeze({
        containerId: "",
        title: "",
        content: "",
    });
    const [newTask, setNewTask] = useState(initTaskInfo);

    const handleOpenContainerMore= (event) => {
        setAnchorEl(event.currentTarget);
        setTargetContainerId(event.currentTarget.attributes.id.value);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAddTask = (e) => {
        setOpenTask(true);
        setTargetContainerId(e.currentTarget.attributes.id.value);
    };
    const handleTaskInputChange = (e) => {
        if(e.target.id){
            setNewTask(prevState => ({
                ...prevState,
                containerId: targetContainerId,
                [e.target.id]: e.target.value
            }))
        }
    };
    const handleCancelNewTask = () => {
        setOpenTask(false);
        setNewTask(initTaskInfo);
    };
    const handleSubmitNewTask = (e) => {
        e.preventDefault();
        console.log(newTask);
        taskService.createTask(newTask).then(res => {return res;}).catch(err => {console.log(err)});
        window.location.reload();
    };

    useEffect(()=> {
        if(newTask.content !== "" && newTask.title !== "") {
            setEmptyInput(false);
        } else {
            setEmptyInput(true);
        }
    },[newTask]);

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
                        <ProjectMembers id={projectId} ref={tapRef}/>
                    </Grid>
                    <Grid item>
                        <AddMember id={projectId} ref={tapRef}/>
                    </Grid>
                    <Grid item>
                        <Button size="small" startIcon={<SettingsIcon/>}>Setting</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.button_group}>
                <Button size="small"><Link to={{pathname: `/projects/${projectId}`}}>Project</Link></Button>
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
                        <Grid container direction='row'  wrap='nowrap' className={classes.containersArea}>
                            {containers && Object.entries(containers).map(([id, container]) => {
                                return (
                                    <Grid key={id} item className={classes.containerArea} >
                                        <Grid container alignItems='center' className={classes.containerHead}>
                                            <Avatar className={classes.taskCount} variant='circular'><Typography variant='body2'>{container.taskCount}</Typography></Avatar>
                                            <Grid container item xs alignItems='center'className={classes.containerTitle}>
                                                <Typography variant='subtitle1'>{container.containerName}</Typography>
                                            </Grid>
                                            <Grid container item xs={3} alignItems='flex-end' justify='flex-end'>
                                                <IconButton size='small' aria-label='add-task' id={id} onClick={handleAddTask}><AddIcon/></IconButton>
                                                <IconButton size='small' aria-label='container-more' id={id} onClick={handleOpenContainerMore}><MoreVertIcon/></IconButton>
                                            </Grid>
                                        </Grid>
                                        <Droppable droppableId={id} key={container._id}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <Grid
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            backgroundColor: snapshot.isDraggingOver ? "#cfd8dc": "#eeeeee",
                                                        }}
                                                        key={id}
                                                        className={classes.containerContent}
                                                    >
                                                        {(openTask && targetContainerId === provided.droppableProps["data-rbd-droppable-id"])? (
                                                            <form className={classes.taskForm} key={id}>
                                                                <Grid item xs={12} style={{padding: 10}}>
                                                                    <TextField
                                                                        required
                                                                        fullWidth
                                                                        multiline
                                                                        margin="dense"
                                                                        label='Title'
                                                                        id="title"
                                                                        value={newTask.title}
                                                                        variant='outlined'
                                                                        onChange={handleTaskInputChange}
                                                                    />
                                                                    <TextField
                                                                        required
                                                                        fullWidth
                                                                        multiline
                                                                        label='Content'
                                                                        margin="dense"
                                                                        id="content"
                                                                        value={newTask.content}
                                                                        rows={4}
                                                                        variant='outlined'
                                                                        onChange={handleTaskInputChange}
                                                                    />
                                                                </Grid>
                                                                <Grid container item justify='space-evenly' style={{paddingBottom: 10}}>
                                                                    <Button variant='outlined' color='primary' onClick={handleCancelNewTask}>Cancel</Button>
                                                                    <Button
                                                                        variant='contained'
                                                                        disabled={emptyInput}
                                                                        style={{
                                                                            backgroundColor: emptyInput? '#81c784':'#2e7d32',
                                                                            color:emptyInput? '#e8f5e9': 'white',
                                                                        }}
                                                                        onClick={handleSubmitNewTask}
                                                                    >Submit</Button>
                                                                </Grid>
                                                            </form>
                                                        ): null}
                                                        {container.tasks && container.tasks.map((task, index) => {
                                                            return (
                                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <Grid item
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={{
                                                                                    backgroundColor: snapshot.isDragging ? 'lightblue' : '#ffecb3',
                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                                className={classes.task}
                                                                            >
                                                                                <Grid container item justify='space-between' alignItems='center'>
                                                                                    <Typography>{task.title}</Typography>
                                                                                    <IconButton size='small' aria-label= {`task-more-${task._id}`}  id={task._id} onClick={()=> alert(task._id)}><MoreVertIcon/></IconButton>
                                                                                </Grid>
                                                                                <div style={{wordWrap: 'break-word'}}>{task.content}</div>
                                                                            </Grid>
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
                            <Menu
                                id={targetContainerId}
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                            >
                                {open &&  (<EditContainer id={targetContainerId} ref={containerRef}/>)}
                                {open && <DeleteContainer value={{containerId: targetContainerId, projectId: projectId}} ref={containerRef}/>}
                            </Menu>
                        </Grid>

                    </DragDropContext>
                )}

            </Grid>
        </div>
    )
}