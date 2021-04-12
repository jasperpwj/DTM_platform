import React, {forwardRef} from 'react';

import{MenuItem} from "@material-ui/core";

const taskService = require("../services/tasks.service");
const TurnIntoIssues = (props, ref) => {
    const handleClickOpen = () => {
        taskService.turnTaskIntoIssue(props.value.taskId)
            .then(res => {window.location.reload();})
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
                Turn into issues
            </MenuItem>
        </React.Fragment>
    )
};
export default forwardRef(TurnIntoIssues);