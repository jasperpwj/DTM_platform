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
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
const invitationService = require("../services/invitations.service");

const useStyles = makeStyles((theme) => ({
    content: {
        margin: theme.spacing(8,2,0,11),
    },
    table: {
        minWidth: 800,
    },
    emptyRow: {
        width: 500,
        height: 240,
        margin: theme.spacing(15,0,0,0),
        borderRadius: '8px 8px 8px 8px',
        border: "2px dashed black",
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
        };
        invitationService.dealWithInvitation(invitationInfo);
        window.location.reload();
    };

    const handleDecline = (event) => {
        event.preventDefault();
        const invitationInfo = {
            status: "decline",
            invitationId: event.currentTarget.attributes.id.value
        };
        invitationService.dealWithInvitation(invitationInfo);
        window.location.reload();
    };

    return (
        (!isEmptyInvitation) ? (
            <Paper className={classes.content}>
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="invitation table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ minWidth: 80 }}>Invitor</TableCell>
                                <TableCell align="center" style={{ width: 130 }}>Member Type</TableCell>
                                <TableCell align="center" style={{ width: 130 }}>Date</TableCell>
                                <TableCell align="center">Project Name</TableCell>
                                <TableCell align="center" style={{ width: 60 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invitations && invitations.map((invitation, index) => {
                                return (
                                    <TableRow key={invitation._id}>
                                        <TableCell component="th" scope="row" align="center">
                                            {invitation.fromUser}
                                        </TableCell>
                                        <TableCell align="center" width={50}>{invitation.invType}</TableCell>
                                        <TableCell align="center" width={150}>{invitation.invDate}</TableCell>
                                        <TableCell align="center">{invitation.projName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label='accept' size='small' style={{color: 'green'}} id={invitation._id} onClick={handleAccept}>
                                                <CheckIcon/>
                                            </IconButton>
                                            <IconButton aria-label='decline' size='small' style={{color: 'red'}} id={invitation._id} onClick={handleDecline}>
                                                <CloseIcon/>
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        ) : (
            <Grid container item justify='center' alignContent='center'>
                <Grid container justify='center' alignContent='center' className={classes.emptyRow}>
                    <Typography variant="h5" component='h3' align='center'>You don't have any invitation.</Typography>
                </Grid>
            </Grid>
        )
    )
}