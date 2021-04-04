import React, {useState, useEffect, forwardRef} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogContentText from '@material-ui/core/DialogContentText';
const containerService = require('../services/container.service');

const EditContainer = (props, ref) => {
    let containerInfo = {
        projectId: props.value.projectId,
        containerId: props.value.containerId,
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        containerService.deleteContainer(containerInfo).then(res => {
            console.log(res);
            window.location.reload();
        })
    };

    return (
        <React.Fragment>
            <MenuItem
                key={"id"}
                name='editContainer'
                ref={ref}
                {...props}
                onClick={handleClickOpen}
            >
                Delete Container
            </MenuItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby='delete-container-dialog'>
                <DialogTitle id='delete-container-dialog'>Delete Container</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If deleted, this container won't be able to be recovered and all tasks inside this container will be removed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
};
export default forwardRef(EditContainer);