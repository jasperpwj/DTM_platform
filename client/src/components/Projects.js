import React, {useState} from 'react';
import TopNavBar from "./TopNavBar";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),

    },
}));

export default function Projects() {
    const classes = useStyles();
    const navBarInfo = {
        title: "Projects"
    };

    return (
        <div className={classes.root}>
            <TopNavBar navInfo={navBarInfo}/>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        This is projects page
                    </Typography>
                </div>
            </main>
        </div>
    )
}