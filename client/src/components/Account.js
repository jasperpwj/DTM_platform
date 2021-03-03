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

export default function AccountPage() {
    const classes = useStyles();
    const navBarInfo = {
        title: "Account"
    };
    return (
        <div className={classes.root}>
            <TopNavBar navInfo={navBarInfo}/>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography paragraph>
                        This is account page
                    </Typography>
                </div>
            </main>

        </div>
    )
}