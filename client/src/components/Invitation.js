import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const invitationService = require("../services/invitations.service");

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: 70,
        marginLeft: 100,
        width: 800,
        minWidth: 600,
    },
    emptyRow: {
        height: 300,
    }
}));

export default function Invitation(props) {
    const [invitations, setInvitations] = useState([]);
    const [isEmptyInvitation, setIsEmptyInvitation] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        invitationService.getInvitations().then(res => {
            if (!(res.data.length)) {
                setIsEmptyInvitation(true);
                setInvitations(res.data);
            } else {
                setIsEmptyInvitation(false);
                setInvitations(res.data);
            }
        })
    }, []);

    const handleAccept = (event) => {
        event.preventDefault();
        const invitationInfo = {
            status: "accept",
            invitationId: event.currentTarget.attributes.id.value
        }
        invitationService.dealWithInvitation(invitationInfo);
        window.location.reload();
    };

    const handleDecline = (event) => {
        event.preventDefault();
        const invitationInfo = {
            status: "decline",
            invitationId: event.currentTarget.attributes.id.value
        }
        invitationService.dealWithInvitation(invitationInfo);
        window.location.reload();
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="invitation table">
                    {(!isEmptyInvitation) ? (
                        <React.Fragment>
                            <TableHead>
                                <TableRow>
                                    <TableCell>From User</TableCell>
                                    <TableCell align="center">Member Type</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Project Name</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invitations && invitations.map((invitation, index) => {
                                    return (
                                        <TableRow key={invitation._id}>
                                            <TableCell component="th" scope="row">
                                                {invitation.fromUser}
                                            </TableCell>
                                            <TableCell align="center" width={50}>{invitation.invType}</TableCell>
                                            <TableCell align="center" width={150}>{invitation.invDate}</TableCell>
                                            <TableCell align="center">{invitation.projName}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="primary" id={invitation._id} onClick={handleAccept}>
                                                    Accept
                                                </Button>
                                                <Button variant="contained" color="secondary" id={invitation._id} onClick={handleDecline}>
                                                    Decline
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </React.Fragment>
                    ) : (
                        <TableBody>
                            <TableRow className={classes.emptyRow}>
                                <TableCell align="center">
                                    <Typography variant="h5">You don't have any invitation.</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}