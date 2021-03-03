import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    button: {
        // backgroundColor: "grey",
        margin: theme.spacing(0,1,0,1),
    },
    title: {
        flexGrow: 1,
        // backgroundColor: "grey",
    }
}));


export default function UnauthenticNavBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        component={Link}
                        href="/"
                    >
                        <HomeRoundedIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {(props && props.navInfo)? props.navInfo.title: ""}
                    </Typography>
                    <Grid container justify='flex-end' xs={6} sm={5} md={3}>
                        <Button
                            color="inherit"
                            variant="outlined"
                            className={classes.button}
                            href='/login'
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            className={classes.button}
                            href='/sign-up'
                        >
                            Sign up
                        </Button>
                    </Grid>

                </Toolbar>

            </AppBar>
        </div>
    )
}