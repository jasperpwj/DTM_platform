import React, {useState, useEffect, useRef} from 'react';
import {fade, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import AddContainer from "./AddContainer";
import EditContainer from "./EditContainer";
import DeleteContainer from "./DeleteContainer";
import EditTaskForm from "./EditTaskForm";
import DeleteTask from "./DeleteTask";
import ProjectMenuBar from "./ProjectMenuBar";
import TaskCompleted from "./TaskCompleted";
import TurnIntoIssues from "./TurnIntoIssues";
const projectService = require("../services/projects.service");
const containerService = require("../services/container.service");
const taskService = require("../services/tasks.service");

const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'block',
        minWidth: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
    },
    toolbar: {
        padding: theme.spacing(2,2,1,2),
        spacing: theme.spacing(1) - 2,

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        border: "1px solid #e0e0e0",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    taskCount: {
        width: theme.spacing(2) + 4,
        height: theme.spacing(2) + 4,
        backgroundColor: '#bf360c',
    },
    containersArea: {
        overflow: 'auto',

        height: '100vh',
        marginLeft: theme.spacing(2),
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
        width: "100%",
        borderRadius: '8px 8px 0 0',
        backgroundColor: '#eeeeee',
    },
    containerTitle: {
        marginLeft: theme.spacing(1),
        width: 330,
    },
    containerContent: {
        height: 'calc(100% - 53px)',
        width: 'calc(100%)',
        borderRadius: '0 0 8px 8px',
        overflow: 'auto',
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
        sourceContainer.taskCount -= 1;
        destContainer.taskCount += 1;
        const sourceTasks = [...sourceContainer.tasks];
        const destTasks = [...destContainer.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);
        taskService.updateDraggingTask(sourceContainer._id, destContainer._id,removed._id, source.index, destination.index)
            .then(res => {
                console.log(res)
            })
            .catch(e => console.log(e));
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
        taskService.updateDraggingTask(container._id, container._id, removed._id, source.index, destination.index)
            .then(res => console.log(res))
            .catch(e => console.log(e));
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
            <AddContainer value={projectId}/>
        </React.Fragment>
    )
};

export default function Project(props) {
    const [containers, setContainers] = useState("");
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [taskAnchorEl, setTaskAnchorEL] = useState(null);
    const [emptyContainer, setEmptyContainer] = useState(false);
    const [projectId] = useState(props.match.params.projectId);
    const [projectContent, setProjectContent] = useState(null);
    const [targetContainerId, setTargetContainerId] = useState(null);
    const [targetTaskId, setTargetTaskId] = useState(null);
    const [openTask, setOpenTask] = useState(false);
    const [emptyInput, setEmptyInput] = useState(true);
    const containerRef = useRef(anchorEl);
    const taskRef = useRef(taskAnchorEl);
    const open = Boolean(anchorEl);
    const tapRef = useRef(anchorEl);
    const openTaskMore = Boolean(taskAnchorEl);
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
        setTaskAnchorEL(null);
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
        taskService.createTask(projectId, newTask.containerId, newTask.title, newTask.content).then(res => {return res;}).catch(err => {console.log(err)});
        window.location.reload();
    };
    const handleOpenTaskMore = (e) => {
        setTaskAnchorEL(e.currentTarget);
        setTargetTaskId(e.currentTarget.attributes.id.value);
        setTargetContainerId(e.currentTarget.attributes.value.value);
    };

    useEffect(()=> {
        if(newTask.content !== "" && newTask.title !== "") {
            setEmptyInput(false);
        } else {
            setEmptyInput(true);
        }
    },[newTask]);

    useEffect(() => {
        projectService.getProjectContent(projectId).then(res => {
            setProjectContent(res);
        });
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
            <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
            <Grid container className={classes.toolbar}>
                <AddContainer value={projectId}/>
                <Grid item style={{flexGrow: 1}}>
                </Grid>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <Button size="small" startIcon={<SettingsIcon/>}>No Fun</Button>
            </Grid>
            <Grid container justify='center' className={classes.dragDropArea}>
                {(emptyContainer)? (
                    <Grid container item className={classes.emptyCard} justify='center' alignContent='center'>{emptyCard(projectId)}</Grid>
                ): (
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
                                                                                    <IconButton size='small' aria-label= {`task-more-${task._id}`} value={container._id} id={task._id} onClick={handleOpenTaskMore}><MoreVertIcon/></IconButton>
                                                                                </Grid>
                                                                                <Grid container wrap='nowrap' justify='center'>
                                                                                    <Grid item xs>
                                                                                        <Typography style={{wordWrap: 'break-word'}} >{task.content}</Typography>
                                                                                    </Grid>
                                                                                </Grid>
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
                                {open && (
                                    <div>
                                        <EditContainer id={targetContainerId} ref={containerRef}/>
                                        <DeleteContainer value={{containerId: targetContainerId, projectId: projectId}} ref={containerRef}/>
                                    </div>
                                )}
                            </Menu>
                            <Menu
                                id={targetTaskId}
                                anchorEl={taskAnchorEl}
                                keepMounted
                                open={openTaskMore}
                                onClose={handleClose}
                            >
                                {openTaskMore && (
                                    <div>
                                        <EditTaskForm id={targetTaskId} ref={taskRef}/>
                                        <TaskCompleted value={{taskId: targetTaskId}} ref={taskRef}/>
                                        <DeleteTask value={{projectId: projectId, taskId: targetTaskId}} ref={taskRef}/>
                                        <TurnIntoIssues value={{taskId: targetTaskId}} ref={taskRef}/>
                                    </div>
                                )}
                            </Menu>
                        </Grid>
                    </DragDropContext>
                )}

            </Grid>
        </div>
    )
}