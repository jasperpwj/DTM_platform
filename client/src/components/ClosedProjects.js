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
import EditProjectFormDialog from "./EditProject";

const projectService = require("../services/projects.service");

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
    emptyRow: {
        height: 300,
    }
});

export default function ClosedProjects(props) {
    const [closedProject, setClosedProjects] = useState([]);
    const [isEmptyProject, setIsEmptyProject] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    useEffect(()=> {
        projectService.getClosedProjects().then(res => {
            if(!(res.data.length)) {
                setIsEmptyProject(true);
                setClosedProjects(res.data);
            } else {
                setIsEmptyProject(false);
                setClosedProjects(res.data);
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
                <TableCell component="th" scope="row">{project.projectName}</TableCell>
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
                        <MenuItem
                            key={project._id + "edit"}
                            id={project._id}
                        >
                            Edit
                        </MenuItem>
                        <EditProjectFormDialog projectId={project._id}/>

                        <MenuItem
                            key={project._id + "open-project"}
                            id={project._id}
                            name="open"
                            onClick={handleProjectStatusChange}
                        >
                            Open Project
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        )
    };
    let closedProjectList = closedProject && closedProject.map((project) => {
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
                                {closedProjectList}
                            </TableBody>
                        </React.Fragment>
                    ):(
                        <TableBody>
                            <TableRow className={classes.emptyRow}>
                                <TableCell align="center">
                                    <Typography variant="h5">You haven't completed have any project.</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}