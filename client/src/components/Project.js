import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'block',
        margin: theme.spacing(8,0,0,9),
        backgroundColor: "lightgrey",
        height: '100vh'
    },
    title: {
        padding: theme.spacing(1),
        backgroundColor: "lightblue",
    },
    test: {
        backgroundColor: "lightgreen",
    }
}));


export default function Project() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="center" >
                <Grid item xs={12} className={classes.title}>
                    <Typography align='left' className={classes.test}>
                        Project Name
                    </Typography>
                    <button >
                        setting
                    </button>
                </Grid>
                <Typography >
                    Page
                </Typography>
            </Grid>
        </div>
    )
}