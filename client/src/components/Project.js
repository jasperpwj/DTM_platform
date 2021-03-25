import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from "@material-ui/core/IconButton";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from "@material-ui/core/AppBar";
const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "white",
        height: '100vh'
    },
    title: {
        padding: theme.spacing(1),
        backgroundColor: "lightblue",
        // spacing: theme.spacing(0,0,0,1),
        padding: theme.spacing(2,2,1,2),
        spacing: theme.spacing(1),
        backgroundColor: "white",
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),

    },
    button_group: {
        backgroundColor: "white",
        padding: theme.spacing(0,0,0,1),
    },
    test: {
        backgroundColor: "lightgreen",
    }
}));


export default function Project(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.title}>
                <Grid item xs>
                    <Typography align="left" variant='h6'>
                        Project Name
                    </Typography>
                </Grid>
                <Grid container item xs justify="flex-end" spacing={1}>
                    <Grid item>
                        <AvatarGroup spacing={2}>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                            <Avatar className={classes.avatar}>M</Avatar>
                        </AvatarGroup>
                    </Grid>
                    <Grid item>
                        <IconButton size="small"><PersonAddIcon/></IconButton>
                    </Grid>
                    <Grid item>
                        <Button size="small" startIcon={<SettingsIcon/>}>Setting</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.button_group}>
                <Button size="small">Project</Button>
                <Button size="small">Tasks</Button>
                <Button size="small">Dashboard</Button>
                <Button size="small">Timeline</Button>
            </Grid>
            <Divider/>
            <Grid container justify="center" >
                <Grid item xs={12}>
                    <Typography >
                        Page
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )

}
