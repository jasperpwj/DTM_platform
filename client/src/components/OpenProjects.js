import React, {useState, useEffect, useRef} from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddProject from "./AddProject";
import EditProjectFormDialog from "./EditProject";
import { Link } from "react-router-dom";
const projectService = require("../services/projects.service");
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    emptyRow: {
        height: 300,
    }
}));

export default function OpenProjects(props) {
    const [openProject, setOpenProjects] = useState([]);
    const [isEmptyProject, setIsEmptyProject] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [targetId, setTargetId] = useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const tapRef = useRef(anchorEl);

    useEffect(()=> {
        projectService.getOpenProjects().then(res => {
            if(!(res.data.length)) {
                setIsEmptyProject(true);
                setOpenProjects(res.data);
            } else {
                setIsEmptyProject(false);
                setOpenProjects(res.data);
            }
        })
    }, []);

    const handleClickMore = (event) => {
        setAnchorEl(event.currentTarget);
        setTargetId(event.currentTarget.attributes.id.value);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    const handleProjectStatusChange = (event) => {
        let changeStatus = {};
        changeStatus.operation = event.target.attributes.name && event.target.attributes.name.value;
        changeStatus.projectId = event.target.attributes.id && event.target.attributes.id.value;
        projectService.changeProjectStatus(changeStatus).then(res => {
            console.log(res);
        });
        window.location.reload();
    };
    return (
        <React.Fragment>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="project table">
                    {(!isEmptyProject)?(
                        <React.Fragment>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography>Name</Typography></TableCell>
                                    <TableCell align="center"><Typography>Visibility</Typography> </TableCell>
                                    <TableCell align="center"><Typography>Updated Time</Typography></TableCell>
                                    <TableCell align="center"><Typography>Descriptions</Typography></TableCell>
                                    <TableCell align="right"><Typography>Actions</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {openProject && openProject.map((project, index) => {
                                    return (
                                        <TableRow key={project._id}>
                                            <TableCell component="th" scope="row">

                                                <Link
                                                    to={{pathname:`/projects/${project._id}`
                                                    }}
                                                >{project.projectName}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center" width={50}>{project.visibility}</TableCell>
                                            <TableCell align="center" width={180}>{project.lastUpdateTime}</TableCell>
                                            <TableCell align="center">{project.description}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    aria-label="more"
                                                    size='small'
                                                    aria-controls="project-more-menu"
                                                    aria-haspopup="true"
                                                    id={project._id}
                                                    tabIndex={index}
                                                    onClick={handleClickMore}
                                                >
                                                    <MoreVertIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                <Menu
                                    id="project-more-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={handleCloseMore}
                                >
                                    {open && (
                                        <MenuItem
                                            key={targetId}
                                            id={targetId}
                                            name="closed"
                                            onClick={handleProjectStatusChange}
                                        >
                                            Close Project
                                        </MenuItem>
                                    )}
                                    {open && (
                                        <EditProjectFormDialog id={targetId} ref={tapRef}/>
                                    )}
                                </Menu>
                            </TableBody>
                        </React.Fragment>
                    ):(
                        <TableBody>
                            <TableRow className={classes.emptyRow}>
                                <TableCell align="center">
                                    <Typography variant="h5">You Don't have any project yet. Create one!</Typography>
                                    <AddProject/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}