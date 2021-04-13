import React, { useState, forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from "@material-ui/core/TextField";

const invitationService = require("../services/invitations.service");

const AddMember = (props, ref) => {
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.id && e.target.value) {
            setUserName(e.target.value);
        }
    }

    const handleAddDeveloper = (e) => {
        e.preventDefault();
        if (props && props.id) {
            const invitationInfo = {
                projectId: props.id,
                invType: "developer",
                targetUsername: userName
            }
            invitationService.sendInvitation(invitationInfo).then(r => {
                if (!r.data.userExistValid) {
                    alert("Username does not exist");
                }
                else if (!r.data.projMemberValid) {
                    alert("User is already in the project members");
                }
                else if (!r.data.dupInvValid) {
                    alert("Invitation has already been sent to the user");
                }
                else {
                    alert("Developer invitation sent successfully");
                }
            });
        }
        else {
            alert("Error: project id not found");
        }
    }

    const handleAddClient = (e) => {
        e.preventDefault();
        if (props && props.id) {
            const invitationInfo = {
                projectId: props.id,
                invType: "client",
                targetUsername: userName
            }
            invitationService.sendInvitation(invitationInfo).then(r => {
                if (!r.data.userExistValid) {
                    alert("Username does not exist");
                }
                else if (!r.data.projMemberValid) {
                    alert("User is already in the project members");
                }
                else if (!r.data.dupInvValid) {
                    alert("Invitation has already been sent to the user");
                }
                else {
                    alert("Client invitation sent successfully");
                }
            });
        }
        else {
            alert("Error: project id not found");
        }
    }


    return (
        <div>
            <IconButton size="small" onClick={handleClickOpen}><PersonAddIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="AddMember" fullWidth={true}>
                <DialogTitle id="AddMember">Add Member</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="userName"
                        label="username"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={handleAddDeveloper}
                    >Add Developer</Button>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={handleAddClient}
                    >Add Client</Button>
                    <Button onClick={handleClose} variant="contained" color="default">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default forwardRef(AddMember);
