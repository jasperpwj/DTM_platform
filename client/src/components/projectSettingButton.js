import React, {useState, useEffect, forwardRef} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
const projectService = require("../services/projects.service");

const ProjectSettingButton = (props, ref) => {
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
        setFormInfo(initialInfo);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const info = {
            projectName: formInfo.projectName,
            description: formInfo.description,
            projectId: props && props.value,
        };
        projectService.editProjectInfo(info).then(r => {return r;});
        window.location.reload();
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
        projectService.getProjectContent(props.value)
            .then(res => {
                setProject(res)
            })
            .catch(err => {console.log(err)});
    },[props.value]);
    return (
        <Grid item>
            <Button size="small" startIcon={<SettingsIcon/>} onClick={handleClickOpen}>Setting</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-editAccount-title" fullWidth={true}>
                <DialogTitle id="form-dialog-editAccount-title">Edit Project Information</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography>Project Name</Typography>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="projectName"
                                    fullWidth
                                    defaultValue={project && project.projectName}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <Typography>Descriptions</Typography>
                        <TextField
                            margin="dense"
                            id="description"
                            fullWidth
                            multiline
                            variant='outlined'
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
                    <Button onClick={handleSubmit} disabled={emptyInput} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
};

export default forwardRef(ProjectSettingButton);