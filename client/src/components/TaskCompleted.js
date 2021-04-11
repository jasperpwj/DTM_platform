import React, {forwardRef} from 'react';

import{MenuItem} from "@material-ui/core";

const taskService = require("../services/tasks.service");

const CompleteTask = (props, ref) => {
    const handleClickOpen = () => {
        console.log(props.value);
        taskService.completeTask(props.value.containerId, props.value.taskId)
            .then(res => { window.location.reload()})
            .catch(err => {console.log(err)})
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
                Complete Task
            </MenuItem>
        </React.Fragment>
    )
};
export default forwardRef(CompleteTask);