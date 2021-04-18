import React, { useState, useEffect, forwardRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PeopleIcon from '@material-ui/icons/People';
import Grid from "@material-ui/core/Grid";
const projectService = require("../services/projects.service");

const ProjectMembers = (props, ref) => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [author, setAuthor] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // style to be discussed
    const useStyles = makeStyles((theme) => ({
        selected: {
            backgroundColor: 'grey'
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        if (props && props.id) {
            projectService.getProjectMember({ projectId: props.id }).then(res => {
                if (res) {
                    setAuthor(res.data.owner);
                    setDevelopers(res.data.developers);
                    setClients(res.data.clients);
                }
                else {
                    alert("Error: project has no members");
                }
            })
        }
        else {
            alert("Error: project id failed to pass in");
        }
    }, []);

    const handleClickOpen = (scrollType) => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleListItemClick = (event, user) => {
        event.preventDefault();
        if (selectedUser === user) {
            setSelectedUser(null);
        }
        else {
            setSelectedUser(user);
        }
    }

    const handleDeleteUser = (event) => {
        event.preventDefault();
        if (!selectedUser) {
            alert("Please select a project member to delete");
        }
        else {
            projectService.deleteProjectMember({ projectId: props.id, username: selectedUser }).then(res => {
                if (res.data.memberDelete) {
                    setSelectedUser(null);
                    window.location.reload();
                    alert(selectedUser + " has been deleted successfully");
                }
                else {
                    alert("Error: project member deletion failed");
                }
            });
        }
    }

    const developerList = developers.map((developer) =>
        <ListItem button
            key={developer}
            selected={selectedUser === developer}
            className={classes.selected}
            onClick={(event) => handleListItemClick(event, developer)}><ListItemIcon><PersonIcon /></ListItemIcon>{developer}</ListItem>);

    const clientList = clients.map((client) =>
        <ListItem button
            key={client}
            selected={selectedUser === client}
            className={classes.selected}
            onClick={(event) => handleListItemClick(event, client)}><ListItemIcon><PersonIcon /></ListItemIcon>{client}</ListItem>);

    return (
        <div>
            <IconButton size="small" onClick={handleClickOpen}><PeopleIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="Member" fullWidth={true}>
                <DialogTitle id="Member">Project Member</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <List>
                                <h4>Owner</h4>
                                <ListItem button key={author}><ListItemIcon><PersonIcon /></ListItemIcon>{author}</ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <List>
                                <h4>Developer</h4>
                                {developerList}
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <List>
                                <h4>Client</h4>
                                {clientList}
                            </List>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {(props.value.userIdentity === "owner") ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteUser}
                        >Delete</Button>) : null}
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default forwardRef(ProjectMembers);
