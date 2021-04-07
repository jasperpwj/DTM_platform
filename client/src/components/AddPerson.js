import React, { useState } from "react";
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
const userService = require("../services/user.service");

export default function AddPerson() {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState('paper');

    // const useStyles = makeStyles((theme) => ({
    //     listItem: {
    //         margin: 10px 0;
    //     },
    // }));

    const handleClickOpen = (scrollType) => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const authors = ["xxx", "sss"];
    const authorList = authors.map((author) =>
        <ListItem button key={author}><ListItemIcon><PersonIcon /></ListItemIcon>{author}</ListItem>);

    return (
        <div>
            <IconButton size="small" onClick={handleClickOpen}><PersonAddIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="Member" fullWidth={true}>
                <DialogTitle id="Member">Member</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <List>
                                <h4>Author</h4>
                                {authorList}
                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <List>
                                <h4>Developer</h4>
                                {authorList}
                            </List>
                            <Button startIcon={<AddIcon />} ></Button>
                        </Grid>
                        <Grid item xs={4}>
                            <List>
                                <h4>Client</h4>
                                {authorList}
                            </List>
                            <Button startIcon={<AddIcon />} ></Button>
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