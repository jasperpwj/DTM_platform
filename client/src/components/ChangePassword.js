import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Alert from '@material-ui/lab/Alert';

const userService = require("../services/user.service");


export default function ChangePasswordFormDialog() {

    const [open, setOpen] = useState(false);
    const [diffInput, setDiffInput] = useState(false);
    const [wrongPwd, setWrongPwd] = useState(false);
    const [empty, setEmpty] = useState(false);
    const initialInfo = Object.freeze({
        ori_password:"",
        password:"",
        password_check:"",
    });
    const [formInfo, setFormInfo] = useState(initialInfo);
    const handleClickOpen = () => {
        setEmpty(false);
        setWrongPwd(false);
        setDiffInput(false);
        setOpen(true);
    };
    const handleClose = () => {
        setDiffInput(false);
        setEmpty(false);
        setWrongPwd(false);
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setDiffInput(false);
        setEmpty(false);
        setWrongPwd(false);
        if ((formInfo.ori_password === "") || (formInfo.password === "") || (formInfo.password_check === "")){
            setEmpty(true);
            setWrongPwd(false);
            setDiffInput(false);
        } else if( !(formInfo.ori_password === "") && !(formInfo.password === "") && !(formInfo.password_check === "")){
            setEmpty(false);
            userService.resetPassword(formInfo).then(r => { 
                if (!r.data.status) {
                    setWrongPwd(true);
                    setDiffInput(false);
                    setEmpty(false);
                } else if (formInfo.password !== formInfo.password_check) {
                    setWrongPwd(false);
                    setDiffInput(true);
                } else {
                    setWrongPwd(false);
                    setDiffInput(false);
                    setEmpty(false);
                    window.location.reload()
                }
            });
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
                color="primary"
                size="small"
                startIcon={<FingerprintIcon/>}
                onClick={handleClickOpen}
            >
                Change
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                <DialogContent>
                {diffInput?( <Alert severity='error'>Password don't match!</Alert>):null}
                {wrongPwd?( <Alert severity='error'>Wrong current password!</Alert>):null}
                {empty?( <Alert severity='error'>Input has empty!</Alert>):null}
                <br/>
                    <form>
                        <TextField
                            required
                            autoFocus
                            fullWidth
                            margin="dense"
                            id="ori_password"
                            label="Current password"
                            type='password'
                            autoComplete='password'
                            onChange={handleChange}
                        />
                        <br/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            id="password"
                            label="New password"
                            type='password'
                            autoComplete='password'
                            onChange={handleChange}
                            
                        />
                        <br/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            id="password_check"
                            label="Reenter new password"
                            type='password'
                            autoComplete='password'
                            // fullWidth
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