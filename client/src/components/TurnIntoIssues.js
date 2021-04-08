import React, {useState, forwardRef} from 'react';

import{Typography, Button, MenuItem} from "@material-ui/core";

const taskService = require("../services/tasks.service");

const TurnIntoIssues = (props, ref) => {
    const handleClickOpen = () => {
        console.log(props)
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
                Turn into issues
            </MenuItem>
        </React.Fragment>
    )
};
export default forwardRef(TurnIntoIssues);