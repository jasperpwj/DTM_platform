import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Alert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
const userService = require("../services/user.service");

export default function ResetPasswordFormDialog() {
    const [open, setOpen] = useState(false);
    const [diffInput, setDiffInput] = useState(false);
    const initialInfo = Object.freeze({
        password:"",
    });
    const [formInfo, setFormInfo] = useState(initialInfo);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setDiffInput(false);
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formInfo.password != formInfo.password_check) {
            // check 的密码不一致
            console.log('cl')
            setDiffInput(true);
        }
        else if(!(formInfo.password === "" )) {
            console.log(formInfo)
            setDiffInput(false);
            userService.resetPassword(formInfo).then(r => {return r;});
            console.log('hi')
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
                startIcon={<FingerprintIcon/>}
                onClick={handleClickOpen}
            >
                Change Password
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                <DialogContent>
                {diffInput?( <Alert severity='error'>Password don't match!</Alert>):(<div><br/><br/></div>)}
                <p/>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="New_Password"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password_check"
                            label="Enter NewPassword Again"
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