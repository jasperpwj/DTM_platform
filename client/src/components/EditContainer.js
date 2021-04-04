import React, {useState, useEffect, forwardRef} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const containerService = require('../services/container.service');

const EditContainer = (props, ref) => {
    const containerId = props.id;
    const [open, setOpen] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);
    const initialContainer = Object.freeze( {
        containerId: containerId,
        containerName: "",
    });
    const [containerInfo, setContainerInfo] = useState(initialContainer);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setContainerInfo(initialContainer);
    };
    const handleInputChange = (e) => {
        if(e.target.id) {
            setContainerInfo({
                ...containerInfo,
                [e.target.id]: e.target.value
            })
        }
    };
    const handleSubmit = (e) => {
        containerService.editContainer(containerInfo).then(res => {
            window.location.reload();
        })
    };
    useEffect(() => {
        if(containerInfo.containerName === "") {
            setEmptyInput(true);
        } else {
            setEmptyInput(false);
        }
    },[containerInfo]);

    return (
        <React.Fragment>
            <MenuItem
                key={"id"}
                name='editContainer'
                ref={ref}
                {...props}
                onClick={handleClickOpen}
            >
                Edit Container
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='edit-container-dialog'
                fullWidth
            >
                <DialogTitle id='edit-container-dialog'>Edit Container Information</DialogTitle>
                <DialogContent >
                    <form>
                        <Grid container item xs={12} spacing={2}>
                            <TextField
                                autoFocus
                                required
                                margin='dense'
                                id='containerName'
                                label="Container Name"
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={emptyInput}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};
export default forwardRef(EditContainer);