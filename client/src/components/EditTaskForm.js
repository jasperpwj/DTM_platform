import React, {useState, forwardRef} from 'react';
import {makeStyles} from "@material-ui/core";
import {Modal} from "@material-ui/core";
import{Typography, Button, MenuItem} from "@material-ui/core";

const taskService = require("../services/tasks.service");

const EditTask = (props, ref) => {
    let taskInfo = {

    };
    const [openModal, setOpenModal] =useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };
    const handleSubmit = (e) => {
        console.log("submit")
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

        </React.Fragment>
    )
};

export default forwardRef(EditTask);