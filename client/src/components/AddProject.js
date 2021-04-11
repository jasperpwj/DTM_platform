import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Alert from "@material-ui/lab/Alert";
const projectService = require("../services/projects.service");


export default function AddProject() {
    const [open, setOpen] = useState(false);
    const initialProjectInfo = Object.freeze( {
        projectName: "",
        description: "",
        visibility: "public",

    });
    const [projectInfo, setProjectInfo] = useState(initialProjectInfo);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleInputChange = (e) => {
        if(e.target.id) {
            setProjectInfo({
                ...projectInfo,
                [e.target.id]: e.target.value
            })
        }
    };

    const handleRadioChange = (e) => {
        setProjectInfo({
            ...projectInfo,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = (e) =>{
        if(projectInfo.projectName === "") {
            setIsError(true);
            setErrorMessage("Project Name cannot be empty")
        } else {
            setIsError(false);
            projectService.createProject(projectInfo)
                .then(response => {
                    console.log(response.data)
                });
            window.location.reload();
        }
    };

    return (
        <React.Fragment>
            <Button
                onClick={handleClickOpen}
                startIcon={<AddIcon/>}
                size="large"
                color="inherit"
            >
            </Button>
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="form-dialog-addProject-title"
                fullWidth={true}>
                <DialogTitle id="form-dialog-addProject-title">Create a project</DialogTitle>
                {isError && <Alert severity="error">{errorMessage}</Alert>}
                <DialogContent>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="projectName"
                                    label="Project Name"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Descriptions:
                                </Typography>
                                <TextField
                                    margin="dense"
                                    id="description"
                                    label="(optional)"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid>
                                <Typography>
                                    Visibility:
                                </Typography>
                                <RadioGroup aria-label="visibility" name="visibility" value={projectInfo.visibility} onChange={handleRadioChange}>
                                    <FormControlLabel value="public" control={<Radio/>} label="Public"/>
                                    <FormControlLabel value="private" control={<Radio/>} label="Private"/>
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}