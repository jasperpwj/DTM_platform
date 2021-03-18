import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
const userService = require("../services/user.service");

export default function EditAccountFormDialog() {
    const [open, setOpen] = useState(false);
    const initialInfo = Object.freeze({
        firstName:"",
        lastName: "",
        phoneNumber: "",
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
        if(!(formInfo.firstName === "" && formInfo.lastName === "" && formInfo.phoneNumber === "")) {
            userService.updateUserAccount(formInfo).then(r => {return r;});
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
        <div >
            <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<EditIcon/>}
                onClick={handleClickOpen}
            >
                Edit Profile
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Edit Profile Information</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="firstName"
                                    label="First Name"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="lastName"
                                    label="Last Name"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phoneNumber"
                            label="Phone Number"
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
        </div>
    )
}