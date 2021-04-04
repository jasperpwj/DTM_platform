import React, {useState, forwardRef} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
const projectService = require("../services/projects.service");

const EditProjectFormDialog = (props, ref) => {
    const [open, setOpen] = useState(false);
    const initialInfo = Object.freeze({
        projectName:"",
        description: "",
    });

    const [formInfo, setFormInfo] = useState(initialInfo);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!(formInfo.projectName === "" && formInfo.description === "")) {
            const info = {
                projectName: formInfo.projectName,
                description: formInfo.description,
                projectId: props && props.id,
            };
            projectService.editProjectInfo(info).then(r => {return r;});
            window.location.reload()
        }
    };
    const handleChange = (e) => {
        if(e.target.id && e.target.value) {
            setFormInfo({
                ...formInfo,
                [e.target.id]: e.target.value
            })
        }
    };
    return (
        <React.Fragment >
            <MenuItem
                type="button"
                onClick={handleClickOpen}
                ref={ref}
                {...props}
            >
                Settings
            </MenuItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-editAccount-title" fullWidth={true}>
                <DialogTitle id="form-dialog-editAccount-title">Edit Profile Information</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="projectName"
                                    label="Project Name"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            fullWidth
                            onChange={handleChange}
                        />
                    </form>
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

export default forwardRef(EditProjectFormDialog);