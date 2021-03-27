import React, {useState, useEffect} from 'react';
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

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
    emptyRow: {
        height: 300,
    }
});

export default function OpenProjects(props) {
    const [openProject, setOpenProjects] = useState([]);
    const [isEmptyProject, setIsEmptyProject] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    useEffect(()=> {
        projectService.getOpenProjects().then(res => {
            if(!(res.data.length)) {
                setIsEmptyProject(true);
                console.log("empty");
                setOpenProjects(res.data);
            } else {
                setIsEmptyProject(false);
                setOpenProjects(res.data);
            }
        })
    }, []);
    const handleClickMore = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    const handleProjectStatusChange = (event) => {
        let changeStatus = {};
        changeStatus.operation = event.target.attributes.name && event.target.attributes.name.value;
        changeStatus.projectId = event.target.attributes.id && event.target.attributes.id.value;
        projectService.changeProjectStatus(changeStatus).then(res => {
        });
        window.location.reload();
    };

    const buildProjectRow = (project) => {
        return (
            <TableRow key={project._id}>
                <TableCell component="th" scope="row"><Link
                    to={{pathname:`/projects/${project.projectName}`,
                        state: {projectId: project._id}
                    }}
                >{project.projectName}</Link></TableCell>
                <TableCell align="center" width={50}>{project.visibility}</TableCell>
                <TableCell align="center" width={150}>{project.lastUpdateTime}</TableCell>
                <TableCell align="center">{project.description}</TableCell>
                <TableCell align="right">
                    <IconButton
                        aria-label="more"
                        aria-controls="project-menu"
                        aria-haspopup="true"
                        onClick={handleClickMore}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="project-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleCloseMore}

                    >
                        <EditProjectFormDialog projectId={project._id}/>
                        <MenuItem
                            key={project._id + "edit"}
                            id={project._id}
                        >
                            Setting
                        </MenuItem>
                        <MenuItem
                            key={project._id + "close_project"}
                            id={project._id}
                            name="closed"
                            onClick={handleProjectStatusChange}
                        >
                            Close Project
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        )
    };
    let openProjectList = openProject && openProject.map((project) => {
        return buildProjectRow(project);
    });

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="project table">
                    {(!isEmptyProject)?(
                        <React.Fragment>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Visibility</TableCell>
                                    <TableCell align="center">Last Updated</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="right">More</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {openProjectList}
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