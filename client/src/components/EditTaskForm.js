import React, {useState, forwardRef, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import {Modal} from "@material-ui/core";
import{Typography, Button, MenuItem} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const taskService = require("../services/tasks.service");

const EditTask = (props, ref) => {
    const taskId = props.id;
    const initialTaskContent = Object.freeze( {
        taskId: taskId,
        title: "",
        content: "",
    });
    const [taskContent, setTaskContent] = useState(initialTaskContent);
    const [openDialog, setOpenDialog] =useState(false);
    const [emptyInput, setEmptyInput] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);setTaskContent(initialTaskContent);

    };
    const handleContentChange = (e) => {
        if(e.target.id) {
            setTaskContent({
                ...taskContent,
                [e.target.id]: e.target.value
            })
        }
    };
    useEffect(() => {
        if(taskContent.content === "" || taskContent.title === "") {
            setEmptyInput(true);
        } else {
            setEmptyInput(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        taskService.editTask(taskContent.taskId, taskContent.title, taskContent.content)
            .then(res => {
            return res;})
            .catch(err => {console.log(err)});
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
                Edit Task
            </MenuItem>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby='edit-container-dialog'
                fullWidth
            >
                <DialogTitle id='edit-container-dialog'>Edit Container Information</DialogTitle>
                <DialogContent >
                    <form>
                        <Grid container item xs={12} spacing={2}>
                            <Typography component='h2' variant='h6'>Task Title: </Typography>
                            <TextField
                                autoFocus
                                required
                                margin='dense'
                                id='title'
                                fullWidth
                                variant='outlined'
                                onChange={handleContentChange}

                            />
                            <Typography component='h2' variant='h6'>Task Content: </Typography>
                            <TextField

                                required
                                margin='dense'
                                id='content'
                                fullWidth
                                rows='4'
                                multiline
                                variant='outlined'
                                onChange={handleContentChange}

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

export default forwardRef(EditTask);