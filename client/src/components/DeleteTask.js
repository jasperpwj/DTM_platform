import React, {useState, forwardRef} from 'react';
import {makeStyles} from "@material-ui/core";
import {Modal} from "@material-ui/core";
import{Typography, Button, MenuItem} from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
const taskService = require("../services/tasks.service");
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        height: 200,
        border: '1px solid #e0e0e0',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2),
        spacing: theme.spacing(1)
    }
}));
const DeleteTask = (props, ref) => {
    const [openModal, setOpenModal] =useState(false);
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };
    const handleDelete = (e) => {
        taskService.deleteTask(props.value.containerId, props.value.taskId)
            .then(res => {return res})
            .catch(e => {console.log(e)});
        window.location.reload();
    };

    return (
        <React.Fragment>
            <MenuItem
                key={`edit-task-${ref}`}
                name='editTask'
                ref={ref}
                {...props}
                onClick={handleClickOpen}
            >
                Delete Task
            </MenuItem>
            <Modal
                aria-labelledby="delete-task-modal"
                aria-describedby="delete-task-modal-description"
                open={openModal}
                onClose={handleClose}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={openModal}>
                    <Grid container className={classes.paper}>
                        <Typography variant='h5'>Delete Task</Typography>
                        <Typography variant='body1' style={{padding: 2}} >Once deleted, task won't be able to be recovered. Do you want to delete this task?</Typography>
                        <Grid container justify='flex-end'>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button color='primary' onClick={handleDelete}>Delete</Button>
                        </Grid>
                    </Grid>

                </Fade>
            </Modal>
        </React.Fragment>
    )
};
export default forwardRef(DeleteTask);