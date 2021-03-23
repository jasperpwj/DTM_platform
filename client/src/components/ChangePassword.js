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


export default function ResetPasswordFormDialog() {

    const [open, setOpen] = useState(false);
    const [diffInput, setDiffInput] = useState(false);
    const [checkPwd, setCheckPwd] = useState(false);
    const [empty, setEmpty] = useState(false);
    const initialInfo = Object.freeze({
        ori_password:"",
        password:"",
        password_check:"",
    });
    const [values, setValues] = React.useState({
        ori_password:"",
        password:"",
        password_check:"",
        showPassword: false
    });
    const [formInfo, setFormInfo] = useState(initialInfo);

    const handleClickOpen = () => {
        setEmpty(false)
        setCheckPwd(false);
        setDiffInput(false);
        setOpen(true);
    };
    const handleClose = () => {
        setDiffInput(false);
        setEmpty(false)
        setCheckPwd(false);
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setDiffInput(false);
        setEmpty(false)
        setCheckPwd(false);
        if ((formInfo.ori_password === "") || (formInfo.password === "") || (formInfo.password_check === "")){
            setEmpty(true)
        } else if( !(formInfo.ori_password === "") && !(formInfo.password === "") && !(formInfo.password_check === "")){
            setEmpty(false)
            userService.resetPassword(formInfo).then(r => { 
                if (!r.data.status) {
                    console.log("hi");
                    setCheckPwd(true);                 
                } else if (formInfo.password != formInfo.password_check) {
                    setCheckPwd(false)
                    setDiffInput(true);
                } else {
                    setCheckPwd(false)
                    setDiffInput(false)
                    userService.resetPassword(formInfo).then(r => { return r;});
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
                {checkPwd?( <Alert severity='error'>Wrong current password!</Alert>):(<div><br/><br/></div>)}
                {empty?( <Alert severity='error'>Input has empty!</Alert>):(<div><br/><br/></div>)}
                <br/>
                    <form>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="ori_password"
                            label="Current password"
                            type='password'
                            autoComplete='password'
                            // fullWidth
                            onChange={handleChange}
                            
                        />
                        <br/>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="New password"
                            type='password'
                            autoComplete='password'
                            // fullWidth
                            onChange={handleChange}
                            
                        />
                        <br/>
                        <TextField
                            required
                            autoFocus
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