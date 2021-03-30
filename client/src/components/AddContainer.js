import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
const containerService = require("../services/container.service");

export default function AddContainer(props) {
    const [open, setOpen] = useState(false);
    const initialContainer = Object.freeze( {
        projectId: props.value,
        containerName: "",
        automation: "",
    });
    const [error, setError] =useState(false);
    const [container, setContainer] = useState(initialContainer);

    const handleInputChange = (e) => {
        if(e.target.id) {
            setContainer({
                ...container,
                [e.target.id]: e.target.value
            })
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setContainer(initialContainer)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(container)
        containerService.addContainer(container).then(res => {return res;});
        window.location.reload();
    }
    useEffect(() => {
        if(container.containerName === "") {
            setError(true);
        } else {
            setError(false);
        }
    }, [container])

    return (
        <Paper >
            <Button variant='outlined' startIcon={<AddIcon/>} onClick={handleClickOpen}>Add Container</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                aria-labelledby='add-container-form'
            >
                <DialogTitle>Add Container</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container alignItems='flex-start' spacing={3} style={{padding: 16}}>
                            <Grid item xs={12}>
                                <Typography>Container Name (required) </Typography>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="containerName"
                                    placeholder="Name could be Todo, In Progress, Complete, etc..."
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Automation Type: </Typography>
                                <Typography >To be developed...</Typography>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={error}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}