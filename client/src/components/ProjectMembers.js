import React, { useState, useEffect, forwardRef } from "react";
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
import AddIcon from '@material-ui/icons/Add';
const projectService = require("../services/projects.service");

const ProjectMembers = (props, ref) => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [author, setAuthor] = useState({});
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(()=> {
        if (props && props.id) {
            projectService.getProjectOwner({projectId: props.id}).then(res =>{
                if (res) {
                    setAuthor(res.data);
                }
                else {
                    alert("Error: project has no author");
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
    };

    // const authorList = authors.map((author) =>
    //     <ListItem button key={author}><ListItemIcon><PersonIcon /></ListItemIcon>{author}</ListItem>);

    const developerList = developers.map((developer) =>
        <ListItem button key={developer}><ListItemIcon><PersonIcon /></ListItemIcon>{developer}</ListItem>);

    const clientList = clients.map((client) =>
        <ListItem button key={client}><ListItemIcon><PersonIcon /></ListItemIcon>{client}</ListItem>);

    return (
        <div>
            <IconButton size="small" onClick={handleClickOpen}><PeopleIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="Member" fullWidth={true}>
                <DialogTitle id="Member">Member</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <List>
                                <h4>Owner</h4>
                                <ListItem button key={author.owner}><ListItemIcon><PersonIcon /></ListItemIcon>{author.owner}</ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <List>
                                <h4>Developer</h4>
                                {developerList}
                            </List>
                            {/* <Button startIcon={<AddIcon />} ></Button> */}
                        </Grid>
                        <Grid item xs={4}>
                            <List>
                                <h4>Client</h4>
                                {clientList}
                            </List>
                            {/* <Button startIcon={<AddIcon />} ></Button> */}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >Delete</Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default forwardRef(ProjectMembers);
