import React, {useState, forwardRef, useEffect} from "react";
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
    const [project, setProject] = useState(null);
    const [emptyInput, setEmptyInput] = useState(false);
    const initialInfo = Object.freeze({
        projectName: project && project.projectName,
        description: project && project.description,
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
        const info = {
            projectName: formInfo.projectName,
            description: formInfo.description,
            projectId: props && props.id,
        };
        projectService.editProjectInfo(info).then(r => {return r;});
        window.location.reload()
    };
    const handleChange = (e) => {
        if(e.target.id) {
            setFormInfo({
                ...formInfo,
                [e.target.id]: e.target.value
            })
        }
    };

    useEffect(() => {
        if(formInfo.projectName === "") {
            setEmptyInput(true);
        } else {
            setEmptyInput(false);
        }
    },[formInfo.projectName]);
    useEffect(()=> {
        projectService.getProjectContent(props.id)
            .then(res => {
                setProject(res)
            })
            .catch(err => {console.log(err)});
    },[props.id]);

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
                <DialogTitle id="form-dialog-editAccount-title">Edit Project Information</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="projectName"
                                    label="Project Name"
                                    defaultValue={project && project.projectName}
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            fullWidth
                            variant='outlined'
                            multiline
                            rows={4}
                            defaultValue={project && project.description}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}  disabled={emptyInput} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};
export default forwardRef(EditProjectFormDialog);