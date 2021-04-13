import React, {useState, useEffect, useRef} from 'react';
import ProjectMenuBar from "./ProjectMenuBar";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import EditTaskForm from "./EditTaskForm";
import DeleteTask from "./DeleteTask";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import TaskCompleted from "./TaskCompleted";
const projectService = require("../services/projects.service");
const taskService = require("../services/tasks.service");

const columns = [
    {id: 'title', label: 'Title', minWidth: 150, align: 'center',},
    {id: 'content', label: 'Content', minWidth: 170, align: 'center',},
    {id: 'requester', label: 'Requester', minWidth: 80, align: 'center',},
    {id: 'createDate', label: 'Created Date', minWidth: 80, align: 'center',},
    {id: 'status', label: 'Status', minWidth: 50, align: 'center',},
    {id: 'action', label: 'Action', minWidth: 20, align: 'center',},
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        minWidth: 800,
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
    },
    table: {
        margin: theme.spacing(0,0,0,0),
        height: '100%',
    },
    content: {
        width: '170px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    emptyContainer: {
        width: 500,
        height: 240,
        margin: theme.spacing(10,0,0,0),
        borderRadius: '8px 8px 8px 8px',
        border: "2px dashed black",

    }
}));

export default function CompletedTasks(props) {
    const classes = useStyles();
    const projectId = props.match.params.projectId;
    const [projectContent, setProjectContent] = useState(null);
    const [page, setPage] = useState(0);
    const [tasks, setTasks] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [targetTaskId, setTargetTaskId] = useState(null);
    const [taskAnchor, setTaskAnchor] = useState(null);
    const taskRef = useRef(taskAnchor);
    const openTaskMore = Boolean(taskAnchor);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleOpenTaskMore = (e) => {
        setTaskAnchor(e.currentTarget);
        setTargetTaskId(e.currentTarget.attributes.id.value);
    };
    const handleCloseTaskMore = (e) => {
        setTaskAnchor(null);
    };
    useEffect(() => {
        projectService.getProjectContent(projectId)
            .then(res => {
                setProjectContent(res);
            })
            .catch(err => {console.log(err)})
    },[projectId]);
    useEffect(() => {
        taskService.getIssuesByProjectId(projectId)
            .then(res => {setTasks(res);})
            .catch(err => {console.log(err)})
    },[projectId]);

    return (
        <div className={classes.root}>
            <ProjectMenuBar value={{projectName: projectContent && projectContent.projectName, projectId: projectId}}/>
            {(tasks && tasks.length > 0)? (
                <Paper className={classes.table}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks && tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={index} key={task._id}>
                                            <TableCell key='title' align='center'>{task.title}</TableCell>
                                            <TableCell key='content' align='center'><Typography className={classes.content}>{task.content}</Typography></TableCell>
                                            <TableCell key='requester' align='center'>{task.requester}</TableCell>
                                            <TableCell key='createDate' align='center'>{new Date(task.createDate).toLocaleDateString()}</TableCell>
                                            <TableCell key='status' align='center'>{task.status}</TableCell>
                                            <TableCell key='edit' align='center' id={task._id} onClick={handleOpenTaskMore} ><MoreVertIcon/></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={tasks && tasks.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    <Menu
                        id={targetTaskId}
                        anchorEl={taskAnchor}
                        keepMounted
                        open={openTaskMore}
                        onClose={handleCloseTaskMore}
                    >
                        {openTaskMore && (
                            <div>
                                <EditTaskForm  id={targetTaskId} ref={taskRef}/>
                                <TaskCompleted value={{taskId: targetTaskId}} ref={taskRef}/>
                                <DeleteTask value={{projectId: projectId, taskId: targetTaskId}} ref={taskRef}/>
                            </div>
                        )}
                    </Menu>
                </Paper>
            ):(
                <Grid container item justify='center' alignContent='center'>
                    <Grid container justify='center' alignContent='center' className={classes.emptyContainer}>
                        <Typography variant="h5" align='center'>You have no issue.</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}